import vehicleDeviceHub from '../vehicleDeviceHub';

export const sendCommandToDevice = (deviceId, cmd) => {
  vehicleDeviceHub.emit('command', deviceId, cmd);
};

export const powerCutCommand = (deviceId, status) => {
  const cmd = status ? 'Powercar123456 00' : 'Powercar123456 11';
  sendCommandToDevice(deviceId, cmd);
};
