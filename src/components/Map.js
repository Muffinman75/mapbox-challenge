import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken={
          "pk.eyJ1IjoibXVmZmlubWFuNzUiLCJhIjoiY2p0cG8xZmc3MDY4OTQ0cjB3dXRkYXdvZSJ9c8_6mudmNdj8bFbcq94nyw"
        }
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      />
    );
  }
}

export default Map;
