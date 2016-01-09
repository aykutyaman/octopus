/* global Meteor, Tracks */

import { Tracks } from '../tracks.js';

Meteor.publish('Track.foo', () => {
  return Tracks.find({}, {sort: {createdAt: -1}, limit: 1});
});
