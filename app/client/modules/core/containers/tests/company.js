const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer} from '../company';

describe('core.containers.company', () => {
  describe('composer', () => {
    const Tracker = {nonreactive: cb => cb()};
    const getCollections = (company) => {
      const Collections = {
	Companies: {findOne: stub()}
      };
      Collections.Companies.findOne.returns(company);
      return Collections;
    };

    it('should subscribe to the given companyId via prop', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const Collections = getCollections();

      const context = () => ({Meteor, Tracker, Collections});
      const companyId = 'acmecorp';
      const onData = spy();

      composer({context, companyId}, onData);
      const args = Meteor.subscribe.args[0];
      expect(args.slice(0, 2)).to.deep.equal([
	'companies.single', companyId
      ]);
    });

    describe('after subscription is ready', () => {
      it('should call onData with data', done => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const company = {name: 'foo'};
        const Collections = getCollections(company);

        const context = () => ({Meteor, Tracker, Collections});
        const companyId = 'acmecorp';
        const onData = (error, data) => {
          expect(data).to.be.deep.equal({company});
          done();
        };
        composer({context, companyId}, onData);
      });
    });

  });
});
