import React from 'react';
import Marker from '../containers/marker';

const Map = React.createClass({
  componentDidMount: function() {
    this.props.create('map');
  },
  render: function() {
    return (
      <div id='map-container'>
	<div id="map" className="googleMap"></div>
	<Marker handler={this.props.update.bind(this)} />
      </div>
    );
  }
});



export default Map;
