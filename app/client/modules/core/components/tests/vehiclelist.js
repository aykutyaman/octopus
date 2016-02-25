import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import VehicleList from '../vehiclelist.jsx';

describe('core.components.vehiclelist', () => {
  const vehicles = [
    {name: 't-one', _id: 'one'},
    {name: 't-two', _id: 'two'},
  ];

  it('handler must have a default click callback', () => {
    const el = shallow(<VehicleList vehicles={vehicles} />);
    const list = el.find('a.list-group-item');
    expect(list.first().prop('onClick')).to.be.a('function');
  });

  it('handler must call click callback', done => {
    const handler = (e) => {
      expect(e).to.be.equal(vehicles[0]['_id']);
      done();
    };
    const el = shallow(<VehicleList vehicles={vehicles}  onVehicleClick={handler} />);
    const firstItem = el.find('a.list-group-item').first();
    firstItem.simulate('click');
  });

});
