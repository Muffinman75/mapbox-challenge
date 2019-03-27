import React, { Component } from "react";
//import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import { json as requestJson } from "d3-request";
import DeckGL, { ScatterplotLayer } from "deck.gl";

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY; // eslint-disable-line

// Source data CSV
//const DATA_URL =
// "https://raw.githubusercontent.com/landmrk/landmrk-developer-test/master/data/National_Trust_Open_Data__Land__Always_Open.geojson";
// eslint-disable-line

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
  }

  locateUser() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
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

  renderLayers() {
    //const { data = data, radius = 30, landColour = COLOUR } = this.props;
    const data =
      "https://raw.githubusercontent.com/landmrk/landmrk-developer-test/master/data/National_Trust_Open_Data__Land__Always_Open.geojson";
    console.log("data:", data);
    return [
      new ScatterplotLayer({
        id: "scatter-plot",
        data,
        radiusScale: 50,
        opacity: 0.8,
        radiusMinPixels: 0.25,
        getPosition: d => [d.coordinates[1], d.coordinates[0]],
        getRadius: 1,
        getLineColor: d => [0, 128, 255],
        getFillColor: d => [0, 150, 255]
      })
    ];
  }

  componentDidMount() {
    this.locateUser();
    requestJson("data/NationalTrustLandData.geojson", (error, response) => {
      if (!error) {
        const data = this._loadData(response);
        return data;
      }
    });
  }

  render() {
    //const { viewState, controller = true, baseMap = true } = this.props;

    return (
      <DeckGL
        layers={this.renderLayers()}
        initialViewState={this.state.viewPort}
        //viewState={viewState}
        //controller={controller}
      >
        <StaticMap
          reuseMaps
          mapStyle="mapbox://styles/mapbox/light-v9"
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    );
  }
}

export default Map;
