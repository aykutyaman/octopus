/* global Vehicles, SimpleSchema */
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Vehicles } from './vehicles.js';

export const newVehicle = new ValidatedMethod({
  name: 'Vehicles.methods.newVehicle',
  validate: new SimpleSchema({
    companyId: { type: String },
    companyName: { type: String },
    plate: { type: String },
    imei: { type: String }
  }).validator(),
  run({ companyId, companyName, imei, plate }) {
    const doc = {
      company: {
        _id: companyId,
        name: companyName
      },
      imei: imei,
      plate: plate
    };

    Vehicles.insert(doc);
  }
});
