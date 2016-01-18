/* global Companies: true , SimpleSchema */
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class CompaniesCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    const result = super(doc, callback);
    return result;
  }
}

export const Companies = new CompaniesCollection('companies');

Companies.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const CompaniesSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Şirket ismi'
  },
  createdAt: {
    type: Date
  }
});

Companies.attachSchema(CompaniesSchema);
