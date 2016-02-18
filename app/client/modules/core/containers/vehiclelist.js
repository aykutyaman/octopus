import VehicleList from '../components/vehiclelist.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, companyId}, onData) => {
  const {Meteor, Collections} = context();
  const handle1 = Meteor.subscribe('vehicles.list', companyId);
  const handle2 = Meteor.subscribe('companies.single', companyId);
  if (handle1.ready() && handle2.ready()) {
    const vehicles = Collections.Vehicles.find().fetch();
    const company = Collections.Companies.findOne();
    onData(null, {vehicles, company});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(VehicleList);
