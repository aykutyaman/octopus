/* global Companies: true , SimpleSchema */

class CompaniesCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super(doc, callback);
  }
}

Companies = new CompaniesCollection('companies');

Companies.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
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
