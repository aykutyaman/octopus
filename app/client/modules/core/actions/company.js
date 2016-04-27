export default {
  showVehicle({FlowRouter}, vehicleId) {
    FlowRouter.go(`/map/${vehicleId}`);
  }
};
