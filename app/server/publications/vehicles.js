import {Vehicles} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function() {
  Meteor.publish('vehicles.list', function(companyId) {
    check(companyId, String);

    // if (!this.userId) {
    //   return this.ready();
    // }

    return Vehicles.find({'company._id': companyId}, {
      limit: 20,
      sort: {createdAt: -1}
    });
  });

  Meteor.publish('vehicles.single', function(vehicleId) {
    check(vehicleId, String);
    return Vehicles.find({_id: vehicleId});
  });
}
