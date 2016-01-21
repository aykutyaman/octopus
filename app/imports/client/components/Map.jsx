/* global Meteor, GoogleMaps, google, ReactMeteorData, React */
import React from 'react';
import { GoogleMaps } from 'meteor/dburles:google-maps';
import { Tracks } from '../../api/tracks/tracks.js';
import { MeteorData } from './MeteorData.jsx';
import { MapMarker } from './MapMarker.jsx';

//TODO: ugly. https://github.com/meteor/meteor/issues/5870
// make a pull request for dburles:google-maps package
window.GoogleMaps = GoogleMaps;

export const Map = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },
  componentDidMount() {
    GoogleMaps.create({
      name: this.props.name,
      element: document.getElementById('map'),
      options: this.props.options
    });
  },
  render() {
    return (
      <div>
	<div id="map" className="googleMap"></div>
	<MeteorData
		subscribe = { () => {
			     return Meteor.subscribe('Tracks.single') }}
		fetch = { () => {
			 return {data: Tracks.findOne()}}}
		render = { ({loading, data}) => {
			  return <MapMarker name="mymap"  data={data} loading={loading} />
			  }}
				 />
      </div>
    )
  }
});
