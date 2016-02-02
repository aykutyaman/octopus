import {Companies} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'companies.create'() {
      console.log('client companies.create method');
    }
  });
}
