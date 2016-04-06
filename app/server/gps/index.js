import {Tracks} from '/lib/collections';
import fibers from 'fibers';
import GPS from 'octopus-gps-tracking';

export default function() {

  const config = {
    debug: true,
    port: 8090,
    device_adapter: 'TK103_2'
  };

  GPS.server(config, (device, connection) => {

    device.login_authorized(true);

    // PING -> When the gps sends their position
    device.on('ping', function(data) {
      console.log(data);
      // TODO: Fiber icinde olmadan cihaz ID'sini almak burada bir bocek yaratmis olabilir
      // Bakiniz: http://stackoverflow.com/questions/34263014/how-to-access-original-context-with-fiber
      const deviceId = this.getUID();
      fibers(() => {
        try {

          console.log(data);

          Tracks.insert({
            imei: data.imei,
            location: {
              coordinates: [data.latitude, data.longitude],
	      type: 'Point'
            },
            createdAt: data.time
          });
        } catch (e) {
          console.log(e);
        }
      }).run();
      return data;
    });

    device.on('login_rejected', () => {
      // login rejected
      console.log('login_rejected');
    });

    device.on('alarm', (alarm_code, alarm_data, msg_data) => {
      console.log('Help! Something happend: ' + alarm_code + ' (' + alarm_data.msg + ')');
    });

    device.on('handshake', () => {
      // handshake
      console.log('handshake');
    });

  });
}
