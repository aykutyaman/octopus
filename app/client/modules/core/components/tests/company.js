import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import Company from '../company.jsx';


describe('core.components.company', () => {
  it('should display the companies title', () => {
    const company = {name: "Şirketler"};
    const el = shallow(<Company company={company} />);
    expect(el.find('h2').text()).to.be.match(/Şirketler/);
  });

  it('should display the correct maps link', () => {
    const company = {_id: "nosoup4u"};
    const el = shallow(<Company company={company} />);
    expect(el.find('a.map-link')).to.have.attr('href').equal('/map/nosoup4u');
  });
});
