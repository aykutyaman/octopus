import { DB } from '/server/graphql/db';
import { getAddressWithLatlng } from '../../journey_helpers';

export const accStart = (data) => {

  const vehicle = DB.Vehicles.getByImei(data.imei);
  if (!vehicle) {
    throw new Error("We cannot find the vehicle for imei:" + data.imei);
  }

  const journey = {
    plate: vehicle.plate,
    imei: data.imei,
    startedAddress: getAddressWithLatlng(data.latitude, data.longitude)
  };

  const journeyId = DB.Reports.createJourney(journey);

  DB.Vehicles.setCurrentJourney(vehicle._id, journeyId);
}
