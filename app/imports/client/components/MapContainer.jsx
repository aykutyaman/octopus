import React from 'react';
import { GoogleMaps } from 'meteor/dburles:google-maps';
import { Map } from './Map.jsx';

export const MapContainer = React.createClass({
  mixins: [ReactMeteorData],
  componentDidMount() {
    GoogleMaps.load();
  },
  getMeteorData() {
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && this._mapOptions()
    };
  },
  _mapOptions() {
    return {
      center: new google.maps.LatLng(39.934486, 32.853241),
      zoom: 7
    };
  },
  render() {
    if (this.data.loaded) {
      return <Map name="mymap" options={this.data.mapOptions} />
    }
    return <div>Harita yükleniyor...</div>;
  }
});
