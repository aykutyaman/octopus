/* global FlowRouter, MainLayout, React */
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

import { AppLeftNav } from '../components/admin/AppLeftNav.jsx';

injectTapEventPlugin();

export const AdminLayout = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  openLeftNav() {
    this.refs.nav.toggle();
  },
  _handleLogout() {
    Meteor.logout( (error) => {
      if (!error) {
        FlowRouter.go('signin');
      }
    });
  },
  navElementRight() {
    return Meteor.userId() ? <FlatButton label="Çıkış" onTouchTap={this._handleLogout} /> : null;
  },
  render() {
    const mainStyles = {
      padding: '10px'
    };
    return (
      <div>
      <AppLeftNav ref="nav" />

      <AppBar
      title={"Octopus Admin"}
      onLeftIconButtonTouchTap={this.openLeftNav}
      iconElementRight={this.navElementRight()}
      />

      <div style={mainStyles}>
      {this.props.content()}
    </div>
      </div>
    );
  }
});
