/* global Meteor GoogleMaps */

Meteor.startup(() => {
  GoogleMaps.load();

  Meteor.autorun(() => {
    if (GoogleMaps.loaded()) {
      console.log(document.getElementById('map'));

      GoogleMaps.create({
	name: 'map-container',
	element: document.getElementById('map'),
	options: {
	  center: new google.maps.LatLng(-37.8136, 144.9631),
	  zoom: 8
	}
      });
    }
  });
});

Map = React.createClass({
  render() {
    return (
      <div id="map" className="googleMap">harita</div>
    );
  }
});
