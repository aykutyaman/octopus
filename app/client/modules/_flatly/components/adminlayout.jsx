import React from 'react';
import AdminNavigation from './adminnavigation.jsx';


const Layout = ({content = () => null}) => (
  <div>
    <AdminNavigation />
    <div className="container">
      {content()}
    </div>
  </div>
);

export default Layout;
