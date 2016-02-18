import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function() {
  Meteor.publish('users.current', function(_id) {
    if (this.userId) {
      return Meteor.users.find({_id: this.userId});
    }
  });
}
