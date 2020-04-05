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
      <SearchBox changeLocation={changeLocation}/>
      <SearchMap location={location}/>
    </>
  )
}
export default NonAuthHome;
