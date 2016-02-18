import {Tracks} from '/lib/collections';
import fibers from 'fibers';
import GPS from 'gps-tracking';

export default function() {

  const config = {
    debug: true,
    port: 8090,
    device_adapter: 'TK103'
  };

  GPS.server(config, (device, connection) => {

    device.on('login_request', function(deviceId, msgParts) {
      // Some devices sends a login request before transmitting their position
      // Do some stuff before authenticate the device...

      // Accept the login request. You can set false to reject the device.
      //this.login_authorized(true);
      this.login_authorized(true);
    });

    // PING -> When the gps sends their position
    device.on('ping', function(data) {
      // TODO: Fiber icinde olmadan cihaz ID'sini almak burada bir bocek yaratmis olabilir
      // Bakiniz: http://stackoverflow.com/questions/34263014/how-to-access-original-context-with-fiber
      const deviceId = this.getUID();
      fibers(() => {
        try {
          Tracks.insert({
            deviceId: deviceId,
            location: {
              coordinates: [data.latitude, data.longitude],
	      type: 'Point'
            }
          });
        } catch (e) {
          console.log(e);
        }
      }).run();
      return data;
    });

    device.on('login_rejected', () => {
      // login rejected
    });

    device.on('alarm', (alarm_code, alarm_data, msg_data) => {
      console.log('Help! Something happend: ' + alarm_code + ' (' + alarm_data.msg + ')');
    });

    device.on('handshake', () => {
      // handshake
    });

  });
}
