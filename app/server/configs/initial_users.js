import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';

export default () => {
  if (Meteor.users.find().count() === 0 ) {
    const id = Accounts.createUser({
      email: 'yaman.ayk@gmail.com',
      password: '2e212e21',
      profile: { name: 'Aykut Yaman' }
    });

    Roles.addUsersToRoles(id, 'root');
  }
}
