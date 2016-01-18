Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    const id = Accounts.createUser({
      email: 'zyaman.ayk@gmail.com',
      password: '2e21',
      profile: { name: 'zAykut Yaman' }
    });

    Roles.addUsersToRoles(id, 'root');
  }
});
