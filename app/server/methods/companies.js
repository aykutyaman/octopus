import {Companies} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
  'companies.create'() {
    console.log('server companies.create method');
  }
});
