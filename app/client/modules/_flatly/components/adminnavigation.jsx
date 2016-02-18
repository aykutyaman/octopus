import React from 'react';

import authComposer from '../../users/containers/account/auth.js';
import _userControls from './usercontrols.jsx';

const UserControls = authComposer(_userControls);


const Navigation = () => (
  <header className="main-header">
    <div className="navbar navbar-inverse navbar-fixed-top">

      <div className="container">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle"
                  data-toggle="collapse" data-target=".navbar-inverse-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Brand</a>
        </div>


	<UserControls />


      </div>

    </div>
  </header>
);

export default Navigation;
