import NewVehicle from '../components/newvehicle.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const error = LocalState.get('SAVING_ERROR');
  if (Meteor.subscribe('companies.list').ready()) {
    const companies = Collections.Companies.find().fetch();
    onData(null, {error, companies});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.vehicles.create,
  clearErrors: actions.vehicles.clearErrors,
  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewVehicle);
