import {Companies} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'companies.create'(name) {
      check(name, String);

      // Show the latency compensations
      Meteor._sleepForMs(500);


      // TODO: Do some user authorization
      const createdAt = new Date();
      const company = {name, createdAt};
      Companies.insert(company);
    }
  });
}
