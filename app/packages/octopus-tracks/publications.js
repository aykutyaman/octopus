/* global Meteor, Tracks */

Meteor.publish('endPosition', () => {
  return Tracks.find({}, {sort: {createdAt: -1}, limit: 1});
});
