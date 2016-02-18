import React from 'react';
import Marker from '../containers/marker';

const Map = ({companyId}) => (
  <div id='map-container'>
    <div id="map" className="googleMap"></div>
    <Marker />
  </div>
);

export default Map;
