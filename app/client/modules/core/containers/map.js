import Map from '../components/map.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {GoogleMaps} from 'meteor/dburles:google-maps';

/**
 * Haritanin yuklenilmesi icin dogru yer burasinin mi oldugundan emin
 * degilim. Bu islemi burada yaparak komponenti stateless olarak
 * kullanabildik. Bunun aksine marker icin komponenti kullanidik.
 */
export const composer = ({context, companyId}, onData) => {
  const {Meteor, Collections} = context();

  GoogleMaps.load();

  if (GoogleMaps.loaded()) {
    onData(null, {});
  }

  if (GoogleMaps.loaded()) {
    GoogleMaps.create({
      name: 'myMap',
      element: document.getElementById('map'),
      options: {
	center: new google.maps.LatLng(39.934486, 32.853241),
	zoom: 7
      }
    });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Map);
