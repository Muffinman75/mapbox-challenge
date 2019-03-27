import React, { Component } from "react";
//import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import { json as requestJson } from "d3-request";
import DeckGL, { ScatterplotLayer } from "deck.gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY; // eslint-disable-line

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewPort: {
        longitude: -2.5919,
        latitude: 51.455311,
        zoom: 11,
        maxZoom: 16,
        pitch: 0,
        bearing: 0
      }
    };

    this.locateUser = this.locateUser.bind(this);
    this.loadData = this.loadData.bind(this);
    this.renderLayers = this.renderLayers.bind(this);
  }

  locateUser() {
    // Finds current location of user
    navigator.geolocation.getCurrentPosition(position => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      console.log("current coords:", longitude, latitude);
      this.setState({
        viewPort: {
          longitude: longitude,
          latitude: latitude
        }
      });
    });
  }

  componentDidMount() {
    this.locateUser();
    requestJson("data/NationalTrustLandData.geojson", (error, response) => {
      if (!error) {
        const data = this.loadData(response);
        console.log("data:", data);
        return data;
      }
    });
  }

  renderLayers() {
    return [
      // Attempting to load geojson data for ScatterplotLayer
      new ScatterplotLayer({
        // Not working
        id: "scatter-plot",
        //data,
        radiusScale: 50,
        opacity: 0.8,
        radiusMinPixels: 15,
        getPosition: d => [d.coordinates[1], d.coordinates[0]],
        getRadius: 1,
        getLineColor: d => [0, 128, 255],
        getFillColor: d => [0, 150, 255]
      })
    ];
  }

  loadData = data => {
    // Set data to state when it's loaded into component
    this.setState({ data });
  };

  render() {
    return (
      <DeckGL
        layers={this.renderLayers()}
        initialViewState={this.state.viewPort}
      >
        <StaticMap
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          reuseMaps
          mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    );
  }
}

export default Map;
