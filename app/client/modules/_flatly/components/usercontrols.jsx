import React from 'react';

export default class extends React.Component {
  getLoggedIn() {
    const {name} = this.props;
    return (
      <div className="navbar-collapse collapse navbar-inverse-collapse">

	<ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle"
		    data-toggle="dropdown">{name} <span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="/profile">Profile</a></li>
              <li><a href="/account">Account</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </li>
	</ul>

	<ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle"
		    data-toggle="dropdown">Yönetim<span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
	      <li><a href="/admin/companies">Şirket Listesi</a></li>
            </ul>
          </li>
	</ul>

      </div>
    );
  }

  getGuest() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/register">Register</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    );
  }

  render() {
    const {loggedIn} = this.props;
    return loggedIn ? this.getLoggedIn() : this.getGuest();
  }
}
