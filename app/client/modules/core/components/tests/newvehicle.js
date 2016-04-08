const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import NewVehicle from '../newvehicle';

describe('core.components.newvehicle', () => {
  const companies = [
    {_id: '1', createdAt: new Date('2016/04/04'), name: 'Küresel'},
    {_id: '2', createdAt: new Date('2016/04/03'), name: 'Artek'},
    {_id: '3', createdAt: new Date('2016/04/01'), name: 'Gimsa'}
  ];

  it('should show the error if there are any', () => {
    const error = 'TheError';
    const el = shallow(<NewVehicle error={error} companies={companies} />);
    expect(el.html()).to.match(/TheError/);
  });

  it('should componies list given number of items', () => {
    const el = shallow(<NewVehicle companies={companies} />);
    expect(el.find('.companies-option').length).to.be.equal(companies.length);
  });

  it('should display the create vehicle form', () => {
    const el = shallow(<NewVehicle companies={companies} />);
    const company = el.find('select').first();
    const plate = el.find('input').first();
    const imei = el.find('input').last();
    const button = el.find('button').first();

    expect(company.node.ref).to.be.equal('companyRef');
    expect(plate.node.ref).to.be.equal('plateRef');
    expect(imei.node.ref).to.be.equal('imeiRef');
    expect(button.prop('onClick')).to.be.a('function');
  });

  it('should create a new vehicle when click on the button', done => {
    const companyValue = 'new-company';
    const plateValue = 'new-plate';
    const imeiValue = 'new-imei';

    const onCreate = (plate, imei, company) => {
      expect(company).to.be.equal(companyValue);
      expect(plate).to.be.equal(plateValue);
      expect(imei).to.be.equal(imeiValue);
      done();
    };

    const el = shallow(<NewVehicle create={onCreate} companies={companies} />);
    const instance = el.instance();

    instance.refs = {
      companyRef: {value: companyValue},
      plateRef: {value: plateValue},
      imeiRef: {value: imeiValue}
    };

    el.find('button').simulate('click');
  });
});
