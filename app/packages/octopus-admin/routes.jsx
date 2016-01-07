/* global Roles, FlowRouter, ReactLayout, AdminLayout */
const isAdmin = (context, redirect) => {
  if (!Roles.userIsInRole(Meteor.user(), 'root')) {
    redirect('signin');
  }
};

FlowRouter.route('/admin', {
  name: 'home',
  action() {
    ReactLayout.render(AdminLayout, {
      content() {
        return <Home />;
      }
    });
  },
  triggersEnter: [isAdmin]
});

FlowRouter.route('/signin', {
  name: 'signin',
  action() {
    ReactLayout.render(AdminLayout, {
      content() {
        return <Login />;
      }
    });
  },
  triggersEnter: [(context, redirect) => {
    if (Meteor.userId()) {
      redirect('home');
    }
  }]
});

FlowRouter.route('/admin/companies', {
  name: 'companies',
  action() {
    ReactLayout.render(AdminLayout, {
      content() {
        return <CompaniesContainer />;
      }
    });
  },
  triggersEnter: [isAdmin]
});
