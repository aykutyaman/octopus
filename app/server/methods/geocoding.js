import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';
import Future from 'fibers/future';

Meteor.methods({
  getFormattedAddress(lat, lng) {
    check(lat, Number);
    check(lng, Number);

    const latlng = lat + ',' + lng;

    const future = new Future();

    HTTP.call('GET', 'https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: latlng,
        key: ''
      }
    }, ( error, response ) => {
      if (error) {
        future.throw(error);
      } else {
        const content = JSON.parse( response.content );
        const address = content.results[0].formatted_address;

        future.return(address);
      }
    });

    return future.wait();
  }
});
