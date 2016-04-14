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
  }
};
