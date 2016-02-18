import {check} from 'meteor/check';

export default function ({Meteor, Collections}) {
  Meteor.methods({
    'companies.create'(name) {
      check(name, String);

      const createdAt = new Date();
      const company = {name, createdAt, saving: true};
      Collections.Companies.insert(company);

    }
  });
}
