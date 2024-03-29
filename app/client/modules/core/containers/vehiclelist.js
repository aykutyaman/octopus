import VehicleList from '../components/vehiclelist.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, companyId}, onData) => {
  const {Meteor, Collections} = context();
  const handle = Meteor.subscribe('vehicles.list', companyId);
  if (handle.ready()) {
    const vehicles = Collections.Vehicles.find().fetch();
    onData(null, {vehicles});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(VehicleList);
