/* global FlowRouter, ReactMeteorData */
import React from 'react';
import Paper from 'material-ui/lib/paper';

export const AdminHome = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },
  getCurrentUserName() {
    const currentUser = this.data.currentUser;
    return currentUser ? currentUser.profile.name : null;
  },
  render() {
    const containerStyle = {
      padding: 50
    };
    return <div>
    <Paper style={containerStyle} zDepth={3}>
    <center>
    <h1>Hoşgeldiniz!</h1>
    { this.data.currentUser ?
      <h3>{this.getCurrentUserName()}</h3> : ''
    }
    </center>
    </Paper>
    </div>;
  }
});
