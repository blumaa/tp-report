import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import MapMarker from "../MapMarker/MapMarker";

const LocationMarker = (locationInfo) => {
  return <MapMarker locationInfo={locationInfo} />;
  // return (
  //   <div className="map-text-background">
  //     <div className="map-text">{locationInfo.marker.name}</div>
  //   </div>
  // );
};

class SearchMap extends Component {
  state = { markers: [], locationLat: 52.536228, locationLng: 13.42606 };

  componentWillReceiveProps = (nextProps) => {
    // console.log(nextProps);
    this.geoCodeLocation(nextProps.location);
  };

  geoCodeLocation = (loc) => {
    Geocode.setApiKey("AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ");

    Geocode.fromAddress(loc).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
        this.fetchMarkers(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  fetchMarkers = async (lat, lng) => {
    try {
      const headers = {
        "X-Requested-With": "XMLHttpRequest",
      };
      const uri = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=grocery_or_supermarket&key=AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ`;
      // console.log("uri", uri);
      const response = await fetch(uri, headers);
      const json = await response.json();
      // console.log("map data from json", json);
      this.setState({
        markers: [...json.results],
        locationLat: lat,
        locationLng: lng,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log(this.props.location);

    const MappedMarkers =
      this.state.markers.length < 1 ? (
        <div>loading...</div>
      ) : (
        this.state.markers.map((mark) => {
          // console.log(mark)
          return (
            <LocationMarker
              key={mark.id}
              lat={mark.geometry.location.lat}
              lng={mark.geometry.location.lng}
              marker={mark}
            />
          );
        })
      );

    // console.log(this.state.locationLat)
    return (
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ" }}
          center={{ lat: this.state.locationLat, lng: this.state.locationLng }}
          defaultZoom={14}
        >
          {MappedMarkers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SearchMap;
