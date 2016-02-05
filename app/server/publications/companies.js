import {Companies} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function() {
  Meteor.publish('companies.list', function() {
    return Companies.find({}, {
      limit: 10,
      sort: {name: 1}
    });
  });
}
