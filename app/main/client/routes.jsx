import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainLayout } from '../../imports/client/layouts/MainLayout.jsx';

import { Home } from '../../imports/client/components/Home.jsx';
import { App } from '../../imports/client/components/App.jsx';

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
