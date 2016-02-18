import {Meteor} from 'meteor/meteor';
import {Tracks} from '/lib/collections';
import {Vehicles} from '/lib/collections';
import {check} from 'meteor/check';

export default function() {
  Meteor.publish('tracks.single', function(vehicleId) {
    check(vehicleId, String);

    const vehicle = Vehicles.findOne({_id: vehicleId});

    if (!vehicle || !vehicle.imei) {
      throw new Meteor.Error(701, 'Araç bilgisine ulaşılamıyor.');
    }

    const selector = {imei: vehicle.imei};
    return Tracks.find(selector);


    //39.869753, 32.821363
    const doc = {
      location: {
	coordinates: [39.869753,32.821363]
      },
      deviceId: 'haleluya',
      createdAt: new Date()
    };

    this.added('tracks', 'myId', doc);
    this.ready();

    Meteor.setTimeout(() => {
      doc.location.coordinates = [39.869353,32.821310];
      this.changed('tracks', 'myId', doc);
    }, 3000);

  });
}
