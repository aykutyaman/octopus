Meteor.publish('Track.foo', function() {
  return Tracks.find({}, {sort: {createdAt: -1}, limit: 1});
});
