import React from 'react';
import {mount} from 'react-mounter';

import {AdminLayout} from '/client/configs/theme.jsx';

import CompanyList from './containers/companylist';
import NewCompany from './containers/newcompany';

export default function(injectDeps, {FlowRouter}) {
  const AdminLayoutCtx = injectDeps(AdminLayout);

  const isAdmin = (context, redirect) => {
    if (!Roles.userIsInRole(Meteor.user(), 'root')) {
      redirect('/login');
    }
  };

  FlowRouter.route('/admin/companies', {
    name: 'companies.list',
    action() {
      mount(AdminLayoutCtx, {
	content: () => (<CompanyList />)
      });
    },
    triggersEnter: [isAdmin]
  });

  FlowRouter.route('/admin/new-company', {
    name: 'newcompany',
    action() {
      mount(AdminLayoutCtx, {
	content: () => (<NewCompany />)
      });
    },
    triggersEnter: [isAdmin]
  });

}
