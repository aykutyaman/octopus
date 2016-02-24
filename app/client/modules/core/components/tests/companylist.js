import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import CompanyList from '../companylist.jsx';

describe('core.components.companylist', () => {
  const companies = [
    {name: 't-one', _id: 'one'},
    {name: 't-two', _id: 'two'},
  ];

  it('should list given number of items', () => {
    const el = shallow(<CompanyList companies={companies}/>);
    expect(el.find('a.list-group-item').length).to.be.equal(companies.length);
  });

  it('should list company name for each item', () => {
    const el = shallow(<CompanyList companies={companies}/>);
    const list = el.find('a.list-group-item');
    list.forEach((a, index) => {
      const aText = a.text();
      expect(aText).to.be.equal(companies[index].name);
    });
  });

  it('shallow list company link for each items', () => {
    const el = shallow(<CompanyList companies={companies}/>);
    const list = el.find('a.list-group-item');
    list.forEach((a, index) => {
      const href = a.prop('href');
      expect(href).to.be.equal(`/admin/companies/${companies[index]._id}`);
    });
  });

});
