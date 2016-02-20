import {Vehicles} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import dummy from '../gps/dummy';

export default function () {
  Meteor.methods({
    'tracks.dummy'(vehicleId, seconds) {
      check(vehicleId, String);

      // TODO: Do some user authorization

      const vehicle = Vehicles.findOne({_id: vehicleId});
      if (!vehicle || !vehicle.imei) {
	throw new Meteor.Error(701, 'Araç bilgisine ulaşılamıyor.');
      }
      dummy(vehicle.imei, 0, seconds); //imei, index, seconds
    }
  });
}
