import React, {useState} from 'react';
import MapContainer from '../MapContainer/MapContainer'
import SearchBox from '../SearchBox/SearchBox'


function NonAuthHome() {
  const [location, setLocation ] = useState(null)

  const changeLocation = (location) => {
    setLocation(location)
  }
  return (
    <>
      <SearchBox changeLocation={changeLocation}/>
      <MapContainer location={location}/>
    </>
  )
}
export default NonAuthHome;
