import React from 'react';

const Layout = ({content = () => null, companyId = null}) => (
  <div className="map-layout">
    <div className="map-journey">
      {content()}
    </div>
  </div>
);

export default Layout;
