import React from 'react';
import AdminNavigation from './adminnavigation.jsx';

const Layout = ({content = () => null}) => (
  <div>
    <AdminNavigation />
    <div className="container admin-layout">
      {content()}
    </div>
  </div>
);

export default Layout;
