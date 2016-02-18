import CompanyList from '../components/companylist.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('companies.list').ready()) {
    const companies = Collections.Companies.find().fetch();
    onData(null, {companies});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(CompanyList);
