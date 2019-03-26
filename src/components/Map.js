import React, { Component } from "react";
import MapGL, { NavigationControl } from "react-map-gl";

const TOKEN = process.env.REACT_APP_MAPBOX_KEY;

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 2.8,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      }
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
    });
    console.log("current location:", longitude, latitude);
    this.setState({
      longitude: longitude,
      latitude: latitude
    });
  }

  // _locateUser() {
  //   // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
  //   navigator.geolocation.getCurrentPosition(position => {
  //     this.updateViewport({
  //       longitude: position.coords.longitude,
  //       latitude: position.coords.latitude
  //     });
  //   });
  // }

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </MapGL>
    );
  }
}
