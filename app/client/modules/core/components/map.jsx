import React from 'react';
import Marker from '../containers/marker';

const Map = React.createClass({
  componentDidMount: function() {
    GoogleMaps.create({
      name: 'myMap',
      element: document.getElementById('map'),
      options: {
	center: new google.maps.LatLng(39.934486, 32.853241),
	zoom: 7
      }
    });
  },
  render: function() {
    return (
      <div id='map-container'>
	<div id="map" className="googleMap"></div>
	<Marker />
      </div>
    );
  }
});



export default Map;
