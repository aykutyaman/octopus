const { describe, it } = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import { messageBus } from '../message-bus';


describe('server.gps.device.message-bus', () => {
  it('should call mapper with gps data', done => {
    const data = {
      latitude: 39.86823167,
      message: "accstart"
    };
    const messageMap = {
      accstart: function(datum) {
	expect(datum).to.be.deep.equal(data);
	done();
      }
    };
    const formatMessage = (message) => {
      return message;
    };
    messageBus({messageMap, data, formatMessage});
  });
});
