import Marker from '../components/marker.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {GoogleMaps} from 'meteor/dburles:google-maps';

export const composer = ({context}, onData) => {
  console.log('marker composer');

  const {Meteor, Collections, LocalState} = context();

  // listeden bir arac secilmedi
  const vehicleId = LocalState.get('vehicle_selected');
  if (!vehicleId) return;

  if (Meteor.subscribe('tracks.single', vehicleId).ready()) {
    const track = Collections.Tracks.findOne();
    console.log(track);
    if (track) {
      onData(null, {track});
    } else {
      console.log('Arac bilgisi bulunamadi');
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Marker);
