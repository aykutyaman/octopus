import SideNav from '../components/sidenav.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  console.log('sidenav composer');

  const {LocalState} = context();

  onData(null, {});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(SideNav);
