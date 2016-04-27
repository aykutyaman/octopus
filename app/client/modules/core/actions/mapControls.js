export default {
  zoomVehicle({LocalState}, zoom) {
    LocalState.set('ZOOM_VEHICLE', !zoom);
  },
  centerVehicle({LocalState}, center) {
    LocalState.set('CENTER_VEHICLE', !center);
  }
};
