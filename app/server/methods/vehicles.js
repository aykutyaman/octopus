import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Companies} from '/lib/collections';
import {Vehicles} from '/lib/collections';

export default function () {
  Meteor.methods({
    'vehicles.create'(plate, imei, companyId) {
      check(plate, String);
      check(imei, String);
      check(companyId, String);

      // TODO: Do some user authorization
      const createdAt = new Date();

      const company = Companies.findOne({_id: companyId}, {fields: {name: 1}});
      if (!company) {
          throw new Meteor.Error(701, "Şirket bilgisine erişilemiyor.");
      }

      const vehicle = {plate, imei, createdAt, company};

      Vehicles.insert(vehicle);

    }
  });
}
