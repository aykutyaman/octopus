import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import NewCompany from '../newcompany.jsx';

describe('core.components.newcompany', () => {
  it('should show the error if there are any', () => {
    const error = 'TheError';
    const el = shallow(<NewCompany error={error} />);
    expect(el.html()).to.match(/TheError/);
  });


});
