/* global Tracks: true */
/* global SimpleSchema Factory faker */

import { SimpleSchema } from 'aldeed:simple-schema';

class TracksCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super(doc, callback);
  }
}

export const Tracks = new TracksCollection('tracks');

// Deny all client-side updates since we will be using methods to manage this collection
Tracks.deny({
  insert() { return true },
  update() { return true },
  remove() { return true }
});


const LocationSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['Point'],
    autoValue: function() {
      return "Point";
    }
  },
  coordinates: {
    type: [Number],
    minCount: 2,
    maxCount: 2,
    decimal: true
  }
});

Tracks.schema = new SimpleSchema({
  location: {
    type: LocationSchema,
    index: '2dsphere'
  },
  deviceId: {
    label: 'The id of the device which sends the data',
    type: String
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

Tracks.attachSchema(Tracks.schema);
