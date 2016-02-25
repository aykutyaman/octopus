import React from 'react';
import SideNav from '../containers/sidenav';

const Layout = ({content = () => null, companyId = null}) => (
  <div className="map-layout">

    <div className="map-sidebar">
      <SideNav companyId={companyId} />
    </div>
    <div className="map-main">
	    {content()}
    </div>

  </div>
);

export default Layout;
