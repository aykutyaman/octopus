/* global Vehicles: true , SimpleSchema */
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class VehiclesCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super(doc, callback);
  }
}

export const Vehicles = new VehiclesCollection('vehicles');

Vehicles.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const CompanySchema = new SimpleSchema({
  _id: {
    type: String
  },
  name: {
    type: String
  }
});

const VehiclesSchema = new SimpleSchema({
  company: {
    type: CompanySchema,
    label: 'Şirket Bilgileri'
  },
  imei: {
    type: String,
    label: 'Araç sim IMEI'
  },
  plate: {
    type: String,
    label: 'Araç Plakası'
  },
  createdAt: {
    type: Date
  }
});

Vehicles.attachSchema(VehiclesSchema);
