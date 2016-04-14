import Map from '../components/journeymap.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {GoogleMaps} from 'meteor/dburles:google-maps';

/**
 * Haritanin yuklenilmesi icin dogru yer burasinin mi oldugundan emin
 * degilim. Bu islemi burada yaparak komponenti stateless olarak
 * kullanabildik. Bunun aksine marker icin komponenti kullanidik.
 */
export const composer = ({context, journeyId}, onData) => {
  const {Meteor, Collections} = context();

  GoogleMaps.load();

  const handle = Meteor.subscribe('journeys.single', journeyId);

  if (GoogleMaps.loaded() && handle.ready()) {
    const journey = Collections.Journeys.findOne();
    onData(null, {GoogleMaps, google, journey});
  }
};

export const depsMapper = (context, actions) => ({
  create: actions.journeymap.create,
  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Map);
