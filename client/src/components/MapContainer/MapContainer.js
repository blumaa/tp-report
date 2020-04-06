import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import MapMarker from "../MapMarker/MapMarker";

const TempMarker = () => {
  // return <MapMarker locationInfo={locationInfo} />;
  return (
    <div className="alert">
      <div className="alert-text">User search bar to find toilet paper nearby.</div>
    </div>
  );
};

class MapContainer extends Component {
  // this component should be the container for the map and the list of markers
  // this component should useQuery to fetch data
  // fetch data is based on props.location
  // first fetch from google maps api
  // then, based on returned data (place.id), search backend for matches
  // use spread operator to overlay backend data onto [markers, setMarkers] = useState([])

  //option 2: fetch from google api here
  //send data to map for display and list for display
  // each report component does individual fetching to backend to check for reports
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
      // console.log(lat, lng)
      const headers = {
        "X-Requested-With": "XMLHttpRequest",
      };
      const uri = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=supermarket&key=AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ`;
      // console.log("uri", uri);
      const response = await fetch(uri, headers);
      const json = await response.json();
      // console.log("map data from json", json);
      this.setState({
        markers: [...json.results],
        locationLat: lat,
        locationLng: lng
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log(this.props.location);

    const MappedMarkers = this.state.markers.map((marker) => {
          // console.log(mark)
          return (
            <MapMarker
              key={marker.id}
              lat={marker.geometry.location.lat}
              lng={marker.geometry.location.lng}
              marker={marker}
            />
          );
        })

    // console.log(this.state.locationLat)

    if (this.state.markers < 1) {
      return (
        <div style={{ height: "70vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ",
            }}
            center={{
              lat: this.state.locationLat,
              lng: this.state.locationLng,
            }}
            defaultZoom={14}
          >
            <TempMarker />
          </GoogleMapReact>
        </div>
      )
    } else {
      // console.log(this.state.locationLat, this.state.locationLng)
      return (
        <div style={{ height: "70vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ",
            }}
            center={{
              lat: this.state.locationLat,
              lng: this.state.locationLng,
            }}
            defaultZoom={14}
          >
            {MappedMarkers}
          </GoogleMapReact>
        </div>
      );
    }
  }
}

export default MapContainer;
