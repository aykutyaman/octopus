import React from 'react';
import TrackPoints from '../containers/trackpoints'


const JourneyMap = React.createClass({
  componentDidMount: function() {
    this.props.create('map');
  },
  render: function() {
    return (
      <div id='map-journey-container'>
	<div id="map" className="googleJourneyMap"></div>
	<TrackPoints gpxFile={this.props.journey.gpx} />
      </div>
    );
  }
});



export default JourneyMap;
