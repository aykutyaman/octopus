import Company from '../components/company.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, companyId}, onData) => {
  const {Meteor, Collections} = context();
  const handle = Meteor.subscribe('companies.single', companyId);
  if (handle.ready()) {
    const company = Collections.Companies.findOne();
    onData(null, {company});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Company);
