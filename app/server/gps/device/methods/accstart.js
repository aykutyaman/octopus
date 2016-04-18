import { DB } from '/server/graphql/db';

export const accStart = (data) => {

  const vehicle = DB.Vehicles.getByImei(data.imei);
  if (!vehicle) {
    throw new Error("We cannot find the vehicle for imei:" + data.imei);
  }

  const latlng = data.latitude + ',' + data.longitude;
  const address = Meteor.call('getFormattedAddress', latlng);

  const journey = {
    plate: vehicle.plate,
    imei: data.imei,
    startedAddress: address
  };

  const journeyId = DB.Reports.createJourney(journey);

  DB.Vehicles.setCurrentJourney(vehicle._id, journeyId);
}
