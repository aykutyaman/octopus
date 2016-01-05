/* global React, FlowRouter, ReactMeteorData */

Home = React.createClass({
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
  _handleLogout() {
    Meteor.logout( (error) => {
      if (!error) {
        FlowRouter.go('signin');
      }
    });
  },
  render() {
    return <div>
    { this.data.currentUser ?
      <label>
      {this.getCurrentUserName()}
      <button onClick={this._handleLogout}>Çıkış</button>
      </label> : ''
    }
    <h3> Octopus Admin </h3>
    </div>;
  }
});
