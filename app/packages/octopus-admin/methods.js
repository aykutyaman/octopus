/* global Companies, SimpleSchema */
Companies.methods = {};

Companies.methods.newCompany = new ValidatedMethod({
  name: 'Companies.methods.newCompany',
  validate: new SimpleSchema({
    name: { type: String }
  }).validator(),
  run({ name }) {
    if (!name) {
      throw new Meteor.Error('Yeni şirket için lütfen bir isim giriniz.');
    }

    Companies.insert({
      name: name
    });
  }
});
