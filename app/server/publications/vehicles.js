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
}
