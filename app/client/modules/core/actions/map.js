export default {
  create({GoogleMaps}, mapDOMId) {
    GoogleMaps.create({
      name: 'myMap',
      element: document.getElementById(mapDOMId),
      options: {
	center: new google.maps.LatLng(39.934486, 32.853241),
	zoom: 7
      }
    });
  },
  update({GoogleMaps, LocalState}, position) {

    // Center and zoom the map view onto the current position.
    const map = GoogleMaps.maps.myMap;
    if (LocalState.get('CENTER_VEHICLE')) {
      map.instance.setCenter(position);
    }

    if (LocalState.get('ZOOM_VEHICLE')) {
      map.instance.setZoom(15);
    }
  }
};
