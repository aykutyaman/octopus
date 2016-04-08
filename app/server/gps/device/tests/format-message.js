const { describe, it } = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import { formatMessage } from '../format-message';


describe('server.gps.device.format-message', () => {
  it('should convert to lowercase', () => {
    expect(formatMessage("ACCStart")).to.be.equal("accstart");
  });
  it('should remove whitespaces', () => {
    expect(formatMessage("ACC Start")).to.be.equal("accstart");
  });
});
