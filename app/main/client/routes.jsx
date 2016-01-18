import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainLayout } from '../../imports/client/layouts/MainLayout.jsx';
import { AdminLayout } from '../../imports/client/layouts/AdminLayout.jsx';

import { Home } from '../../imports/client/components/Home.jsx';
import { App } from '../../imports/client/components/App.jsx';

import { AdminHome } from '../../imports/client/components/admin/AdminHome.jsx';
import { Login } from '../../imports/client/components/admin/Login.jsx';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {
      content: () => (<Home />)
    });
  }
});

FlowRouter.route('/embed/:deviceId', {
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
