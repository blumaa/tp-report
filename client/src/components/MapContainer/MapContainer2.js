import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";

class MapContainer2 extends Component {
    state = { markers: [], locationLat: 52.536228, locationLng: 13.42606 };


  // this component should be the container for the map and the list of markers

  //option 2: fetch from google api here
  //send data to map for display and list for display
  // each report component does individual fetching to backend to check for reports
  render() {
      console.log(this.props.location)
    return <div>map container</div>;
  }
}

export default MapContainer2;
