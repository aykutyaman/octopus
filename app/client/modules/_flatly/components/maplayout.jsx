import React from 'react';
import SideNav from '../containers/sidenav';

const Layout = ({content = () => null}) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-3 col-md-2 sidebar">
	<SideNav />
      </div>
      <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
	{content()}
      </div>
    </div>
  </div>
);

export default Layout;
