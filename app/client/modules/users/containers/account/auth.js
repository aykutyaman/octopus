import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor} = context();
  if (Meteor.subscribe('users.current').ready()) {
    const loggedIn = Meteor.userId() || false;
    const user = Meteor.users.findOne(Meteor.userId());
    const name = user ? user.profile.name : '';
    onData(null, {loggedIn, user, name});
  }
};

export default (component) => composeAll(
  composeWithTracker(composer),
  useDeps()
)(component);
