/* global Meteor, Companies, Vehicles, SimpleSchema */

Meteor.publish('Companies.inList', function() {
  if (!this.userId) {
    return this.ready();
  }

  return Companies.find({}, {
    limit: 10,
    sort: {name: 1}
  });
});

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
