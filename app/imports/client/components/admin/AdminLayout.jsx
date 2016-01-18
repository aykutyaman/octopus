/* global FlowRouter, MainLayout, React */
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';

import { AppLeftNav } from './AppLeftNav.jsx';

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
    const containerStyle = {
      padding: 20
    };
    return <div>
      <AppLeftNav ref="nav" />

      <AppBar
	      title={"Octopus Admin"}
	      onLeftIconButtonTouchTap={this.openLeftNav}
	      iconElementRight={this.navElementRight()}
      />

      <Paper style={containerStyle} zDepth={3}>
	{this.props.content()}
      </Paper>
    </div>;
  }
});
