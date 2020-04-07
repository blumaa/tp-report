import React, { useState } from "react";
import axios from "axios";


const SearchBox = ({ changeLocation }) => {
  const [location, setLocation] = useState(null);

  const handleChange = e => {
    setLocation(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    changeLocation(location);
  };

  return (
    <form onSubmit={handleSubmit} id="search-form">
      <input
        id="search-box"
        type="text"
        name="search"
        placeholder="what is your location?"
        onChange={handleChange}
      />
      <button id="search-button">Search</button>
    </form>
  );
};

export default SearchBox;
