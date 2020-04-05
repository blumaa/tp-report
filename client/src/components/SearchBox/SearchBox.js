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
    // searchTrack(location)
    // try {
    //   const requestBody = {
    //     query: `
                  
        
    //     mutation{
    //                 createSearchTerm(searchTermInput: {
    //                   location: "${location}"
    //                 }) {
    //                   _id
    //                   location
    //                 }
    //               } 
    //             `
    //   };

    //   const { data } = await axios.post(
    //     "http://localhost:5000/graphql",
    //     requestBody
    //   );
    // } catch (e) {
    //   console.log(e);
    // }
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
