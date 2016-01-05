/* global Roles, FlowRouter, ReactLayout, Layout */
const isAdmin = (context, redirect) => {
  if (!Roles.userIsInRole(Meteor.user(), 'root')) {
    redirect('signin');
  }
};

FlowRouter.route('/admin', {
  name: 'home',
  action() {
    ReactLayout.render(Layout, {
      content: <Home />
    });
  },
  triggersEnter: [isAdmin]
});

FlowRouter.route('/signin', {
  name: 'signin',
  action() {
    ReactLayout.render(Layout, {
      content: <Login />
    });
  }
});
