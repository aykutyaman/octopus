/* global Meteor, Tracks */

Meteor.publish('Track.foo', () => {
  return Tracks.find({}, {sort: {createdAt: -1}, limit: 1});
});
