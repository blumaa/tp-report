// src/components/Home/auth.js
import React, { useState } from 'react';
import MyFancyComponent from '../App/Components/MapComponent'
import SearchBox from '../App/Components/SearchBox'

function AuthHome() {
  const [location, setLocation ] = useState(null)

  const changeLocation = (location) => {
    setLocation(location)
  }
  return (
    <>
      <h2>TP REPORT</h2>
      {/* <p>You are logged in</p> */}
      <SearchBox changeLocation={changeLocation}/>
      <MyFancyComponent location={location}/>
    </>
  )
}
export default AuthHome;
