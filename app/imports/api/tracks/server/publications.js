/* global Meteor, Tracks */

import { Tracks } from '../tracks.js';

Meteor.publish('Tracks.single', () => {
  return Tracks.find({}, {sort: {createdAt: -1}, limit: 1});
});
