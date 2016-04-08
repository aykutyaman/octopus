import fibers from 'fibers';
import GPS from 'octopus-gps-tracking';
import { messageBus } from './device/message-bus';
import { messageMap } from './device/message-map';
import { formatMessage } from './device/format-message';

export default function() {

  const config = {
    debug: true,
    port: 8090,
    device_adapter: 'TK103_2'
  };

  GPS.server(config, (device, connection) => {
      console.log('SERVE ME');
      device.login_authorized(true);

      // PING -> When the gps sends their position
      device.on('ping', function(data) {
        // TODO: Fiber icinde olmadan cihaz ID'sini almak burada bir bocek yaratmis olabilir
        // Bakiniz: http://stackoverflow.com/questions/34263014/how-to-access-original-context-with-fiber
        const deviceId = this.getUID();
        fibers(() => {
          try {
            messageBus({messageMap, data, formatMessage});
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
