import fibers from 'fibers';
import GPS from 'octopus-gps-tracking';

import { messageBus } from './device/message-bus';
import { messageMap } from './device/message-map';
import { formatMessage } from './device/format-message';

import vehicleDeviceHub from './vehicleDeviceHub';

export default function() {
  const config = {
    debug: true,
    port: 8090,
    device_adapter: 'TK103_2'
  };

  const gpsServer = GPS.server(config, (device, connection) => {
    console.log('SERVE ME');
    device.login_authorized(true);

    // PING -> When the gps sends their position
    device.on('ping', (data) => {

      fibers(() => {
        try {
          messageBus({messageMap, data, formatMessage});
        } catch (e) {
          console.log(e);
        }
      }).run();

      return data;
    });


  });

  vehicleDeviceHub.on('command', (deviceId, cmd) => {
    try {
      gpsServer.send_cmd(deviceId, cmd);
    } catch(e) {
      console.log(e);
    }
  });
}
