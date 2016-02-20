import {Meteor} from 'meteor/meteor';
import {Tracks} from '/lib/collections';
import {Vehicles} from '/lib/collections';
import {check} from 'meteor/check';
import dummy from '../gps/dummy';

export default function() {

  //dummy(562002524475, 0); //imei, index

  Meteor.publish('tracks.single', function(vehicleId) {
    check(vehicleId, String);

    const vehicle = Vehicles.findOne({_id: vehicleId});

    if (!vehicle || !vehicle.imei) {
      throw new Meteor.Error(701, 'Araç bilgisine ulaşılamıyor.');
    }

    const selector = {imei: vehicle.imei};
    const options  = {sort: {createdAt: -1}, limit: 1};
    return Tracks.find(selector, options);
  });
}
