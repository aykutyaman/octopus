import Marker from '../components/marker.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {GoogleMaps} from 'meteor/dburles:google-maps';

export const composer = ({context}, onData) => {
  console.log('marker composer');

  const {Meteor, Collections, FlowRouter} = context();
  const vehicleId = FlowRouter.getParam('vehicleId');

  if (!vehicleId) return;

  const vehicleSubscribe = Meteor.subscribe('vehicles.single', vehicleId);
  const trackSubscribe = Meteor.subscribe('tracks.single', vehicleId);

  if (vehicleSubscribe.ready() && trackSubscribe.ready()) {
    const track = Collections.Tracks.findOne();
    const vehicle = Collections.Vehicles.findOne();

    if (track && vehicle) {
      const plate = vehicle.plate;
      onData(null, {track, plate});
    } else {
      console.log('Arac bilgisi bulunamadi');
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Marker);
