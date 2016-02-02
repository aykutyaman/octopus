import loadMethodStubs from './configs/method_stubs';

loadMethodStubs();

Meteor.call('companies.create');
