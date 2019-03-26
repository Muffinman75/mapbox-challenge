import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

//Mapbox Token
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

//Geojson Data URL
const DATA =
  "https://github.com/landmrk/landmrk-developer-test/blob/master/data/National_Trust_Open_Data__Land__Always_Open.geojson";

const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [2.0, 0.0, 1.0, 0.0],
  numberOfLights: 2
};

const INITIAL_VIEW_STATE = {
  latitude: -35.280937,
  longitude: 149.130005,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

export default class Map extends Component {
  renderLayer() {
    const { data = DATA } = this.props;

    return [
      new GeoJsonLayer({
        id: "geoJson",
        data,
        filled: true,
        lightSettings: LIGHT_SETTINGS
      })
    ];
  }

  render() {
    const { viewState, baseMap = true } = this.props;

    return (
      <DeckGL
        layers={this.renderLayer()}
        initialViewState={INITIAL_VIEW_STATE}
        viewState={viewState}
        controller={true}
      >
        {baseMap && (
          <StaticMap
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        )}
      </DeckGL>
    );
  }
}
