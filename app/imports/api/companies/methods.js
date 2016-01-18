import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Companies } from './companies.js';

export const newCompany = new ValidatedMethod({
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
