import {Meteor} from 'meteor/meteor';
import {Tracks} from '/lib/collections';

export default function() {
  Meteor.publish('tracks.single', function(vehicleId) {
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
