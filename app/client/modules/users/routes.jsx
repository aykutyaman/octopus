import React from 'react';
import {mount} from 'react-mounter';
import {AdminLayout} from '/client/configs/theme.jsx';
import Login from './components/account/login.jsx';


export default function(injectDeps, {FlowRouter}) {
  const AdminLayoutCtx = injectDeps(AdminLayout);

  FlowRouter.route('/login', {
    name: 'users.login',
    action() {
      mount(AdminLayoutCtx, {
	content: () => (<Login />)
      });
    }
  });

  FlowRouter.route('/logout', {
    name: 'users.logout',
    action() {
      Meteor.logout(() => {
	FlowRouter.go('/login');
      });
    }
  });



}
