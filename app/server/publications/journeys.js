import {Journeys} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function() {
  Meteor.publish('journeys.single', function(journeyId) {
    check(journeyId, String);
    const selector = {_id: journeyId};
    return Journeys.find(selector);
  });
}
