import vehicleDeviceHub from '../../vehicleDeviceHub';

export const sendCommandToDevice = (deviceId, cmd) => {
  vehicleDeviceHub.emit('command', deviceId, cmd);
};

Meteor.methods({
  'gps.sendCommandToDevice'( deviceId, cmd ) {
    sendCommandToDevice(deviceId, cmd);
  }
});
