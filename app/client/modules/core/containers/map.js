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
    onData(null, {GoogleMaps, google});
  }
};

export const depsMapper = (context, actions) => ({
  create: actions.map.create,
  update: actions.map.update,
  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Map);
