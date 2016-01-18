import { Vehicles } from '../vehicles.js';

Meteor.publish('Vehicles.inList', function(companyId) {
  check(companyId, String);

  if (!this.userId) {
    return this.ready();
  }

  return Vehicles.find({
    'company._id': companyId
  }, {
    limit: 10,
    sort: {createdAt: -1}
  });
});
