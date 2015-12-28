/* global Meteor GoogleMaps */

Meteor.startup(() => {
  GoogleMaps.load();

  Meteor.autorun(() => {
    if (GoogleMaps.loaded()) {
      GoogleMaps.create({
	name: 'myMap',
	element: document.getElementById('map'),
	options: {
	  center: new google.maps.LatLng(-37.8136, 144.9631),
	  zoom: 8
	}
      });

      GoogleMaps.ready('myMap', function(map) {
	var marker = new google.maps.Marker({
	  position: new google.maps.LatLng(-37.8136, 144.9631),
	  map: map.instance
	});
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
