import React from 'react';
import {mount} from 'react-mounter';

import {AdminLayout} from '/client/configs/theme.jsx';
import {MapLayout} from '/client/configs/theme.jsx';

import CompanyList from './containers/companylist';
import NewCompany from './containers/newcompany';
import Company from './containers/company';
import NewVehicle from './containers/newvehicle';
import Map from './containers/map';


export default function(injectDeps, {FlowRouter}) {
  const AdminLayoutCtx = injectDeps(AdminLayout);
  const MapLayoutCtx = injectDeps(MapLayout);

  const isAdmin = (context, redirect) => {
    if (!Roles.userIsInRole(Meteor.user(), 'root')) {
      // Sayfa yenilendiginde giris yapmis olsak bile login'e yonlendiriyor
      //redirect('/login');
    }
  };

  FlowRouter.route('/', {
    triggersEnter: [(context, redirect) => {
      redirect('/login');
    }]
  });


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

  FlowRouter.route('/admin/companies/:companyId', {
    name: 'company',
    action({companyId}) {
      mount(AdminLayoutCtx, {
	content: () => (<Company companyId={companyId}/>)
      });
    },
    triggersEnter: [isAdmin]
  });

  FlowRouter.route('/admin/new-vehicle', {
    name: 'newvehicle',
    action() {
      mount(AdminLayoutCtx, {
	content: () => (<NewVehicle />)
      });
    },
    triggersEnter: [isAdmin]
  });


  FlowRouter.route('/map/:companyId', {
    name: 'map',
    action({companyId}) {
      mount(MapLayoutCtx, {
	content: () => (<Map companyId={companyId}/>),
	companyId: companyId
      });
    },
    triggersEnter: [isAdmin]
  });
}
