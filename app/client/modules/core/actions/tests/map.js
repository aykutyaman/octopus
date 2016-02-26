const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../map';

describe('core.actions.map', () => {
  describe('update', () => {
    it('should call setCenter method to center the map', () => {
      const GoogleMaps = {maps: {myMap:{instance:{setCenter: spy()}}}};
      const position = "__LOCATION__";
      const LocalState = {get: stub()};
      LocalState.get.withArgs('CENTER_VEHICLE').returns(true);

      actions.update({GoogleMaps, LocalState}, position);

      const args = GoogleMaps.maps.myMap.instance.setCenter.args[0];
      expect(args[0]).to.be.equal('__LOCATION__');
    });

    it('should update map zoom to the default zoom value', () => {
      const GoogleMaps = {maps: {myMap:{instance:{setZoom: spy()}}}};
      const LocalState = {get: stub()};
      LocalState.get.withArgs('ZOOM_VEHICLE').returns(true);

      actions.update({GoogleMaps, LocalState});

      const args = GoogleMaps.maps.myMap.instance.setZoom.args[0];
      expect(args[0]).to.be.equal(15);
    });

  });
});
