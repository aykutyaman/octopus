import { Companies } from '../companies.js';

Meteor.publish('Companies.inList', function() {
  if (!this.userId) {
    return this.ready();
  }

  return Companies.find({}, {
    limit: 10,
    sort: {name: 1}
  });
});

Meteor.publish('Companies.single', function(companyId) {
  check(companyId, String);

  if (!this.userId) {
    return this.ready();
  }

  return Companies.find({
    _id: companyId
  }, {
    fields: Companies.inListFields,
    limit: 1
  });
});
