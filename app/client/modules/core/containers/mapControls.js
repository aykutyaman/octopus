import MapControls from '../components/mapControls.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {LocalState} = context();

  const zoom = LocalState.get('ZOOM_VEHICLE');
  const center = LocalState.get('CENTER_VEHICLE');

  onData(null, {zoom, center});
};

export const depsMapper = (context, actions) => ({
  zoomVehicle: actions.mapControls.zoomVehicle,
  centerVehicle: actions.mapControls.centerVehicle,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MapControls);
