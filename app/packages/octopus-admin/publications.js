/* global Meteor, Companies */

Meteor.publish('Companies.inList', function() {
  if (!this.userId) {
    return this.ready();
  }

  return Companies.find({}, {
    fields: Companies.inListFields,
    limit: 10,
    sort: {name: 1}
  });
});
