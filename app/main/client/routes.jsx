import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainLayout } from '../../imports/client/components/MainLayout.jsx';
import { AdminLayout } from '../../imports/client/components/admin/AdminLayout.jsx';

import { Home } from '../../imports/client/components/Home.jsx';
import { App } from '../../imports/client/components/App.jsx';

import { AdminHome } from '../../imports/client/components/admin/AdminHome.jsx';
import { Login } from '../../imports/client/components/admin/Login.jsx';
import { CompaniesContainer } from '../../imports/client/components/admin/CompaniesContainer.jsx';
import { VehiclesContainer } from '../../imports/client/components/admin/VehiclesContainer.jsx';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {
      content: () => (<Home />)
    });
  }
});

FlowRouter.route('/embed/:companyId', {
  name: 'embed',
  action() {
    mount(MainLayout, {
      content: () => (<App />)
    });
  }
});

// ADMIN

const isAdmin = (context, redirect) => {
  if (!Roles.userIsInRole(Meteor.user(), 'root')) {
    //redirect('signin');
  }
};

FlowRouter.route('/admin', {
  name: 'adminHome',
  action() {
    mount(AdminLayout, {
      content: () => (<AdminHome />)
    });
  },
  triggersEnter: [isAdmin]
});

FlowRouter.route('/signin', {
  name: 'signin',
  action() {
    mount(AdminLayout, {
      content: () => (<Login />)
    });
  },
  triggersEnter: [(context, redirect) => {
    if (Meteor.userId()) {
      redirect('adminHome');
    }
  }]
});

FlowRouter.route('/admin/companies', {
  name: 'companies',
  action() {
    mount(AdminLayout, {
      content: () => (<CompaniesContainer />)
    });
  },
  triggersEnter: [isAdmin]
});

FlowRouter.route('/admin/companies/:companyId/vehicles', {
  name: 'vehicles',
  action() {
    mount(AdminLayout, {
      content: () => (<VehiclesContainer />)
    });
  },
  triggersEnter: [isAdmin]
});
