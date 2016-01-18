/* global FlowRouter, ReactMeteorData */
import React from 'react';

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

    return <div style={containerStyle}>
    <center>
      <h1>Hoşgeldiniz!</h1>
      { this.data.currentUser ?
       <h3>{this.getCurrentUserName()}</h3> : ''
      }
    </center>
    </div>;
  }
});
