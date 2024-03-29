import React from 'react';
import {mount} from 'react-mounter';

import {AdminLayout} from '/client/configs/theme.jsx';
import {MapLayout} from '/client/configs/theme.jsx';
import {JourneyMapLayout} from '/client/configs/theme.jsx';

import CompanyList from './containers/companylist';
import NewCompany from './containers/newcompany';
import Company from './containers/company';
import NewVehicle from './containers/newvehicle';
import Map from './containers/map';
import JourneyMap from './containers/journeymap';


export default function(injectDeps, {FlowRouter}) {
  const AdminLayoutCtx = injectDeps(AdminLayout);

  // XXX: Bu iki layout varligi tartismali. Ikincisinde sidebar olmamasi
  // gerektigi icin ayri bir layout eklendi. Muhtemelen ilkinden de sidebar
  // cikarilacak.
  const MapLayoutCtx = injectDeps(MapLayout);
  const JourneyMapLayoutCtx = injectDeps(JourneyMapLayout);

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


  FlowRouter.route('/map/:vehicleId', {
    name: 'map',
    action() {
      mount(MapLayoutCtx, {
	content: () => <Map />
      });
    },
    triggersEnter: [isAdmin]
  });

  FlowRouter.route('/journey/map/:journeyId', {
    name: 'journeyMap',
    action({journeyId}) {
      mount(JourneyMapLayoutCtx, {
	content: () => (<JourneyMap journeyId={journeyId} />)
      });
    },
    triggersEnter: [isAdmin]
  });
}
