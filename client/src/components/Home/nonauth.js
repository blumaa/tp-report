import React, {useState} from 'react';
import SearchMap from '../MapComponent/MapComponent'
import SearchBox from '../SearchBox/SearchBox'


function NonAuthHome() {
  const [location, setLocation ] = useState(null)

  const changeLocation = (location) => {
    setLocation(location)
  }
  return (
    <>
      <h2>TP REPORT</h2>
      {/* <p>You are logged in</p> */}
      <SearchBox changeLocation={changeLocation}/>
      <SearchMap location={location}/>
    </>
  )
}
export default NonAuthHome;
