import Marker from '../components/marker.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {GoogleMaps} from 'meteor/dburles:google-maps';

export const composer = ({context}, onData) => {
  console.log('marker composer');

  const {Meteor, Collections, LocalState} = context();

  // listeden bir arac secilmedi
  const vehicleId = LocalState.get('vehicleId');
  console.log(vehicleId);
  if (!vehicleId) return;

  if (Meteor.subscribe('tracks.single').ready()) {
    console.log('tracks.single subs. is ready');
    const track = Collections.Tracks.findOne();
    onData(null, {track});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Marker);
