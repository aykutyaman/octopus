Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    const id = Accounts.createUser({
      email: "yaman.ayk@gmail.com",
      password: "2e21",
      profile: { name: "Aykut Yaman" }
    });

    Roles.addUsersToRoles(id, "root");
  }
});
