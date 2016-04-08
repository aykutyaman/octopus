import { DB } from '/server/graphql/db';

export const accStart = (data) => {

  const vehicle = DB.Vehicles.getByImei(data.imei);
  if (!vehicle) {
    throw new Error("We cannot find the vehicle for imei:" + data.imei);
  }

  const journey = {
    plate: vehicle.plate,
    imei: data.imei,
    startedAddress: "Find Out Started Address"
  };

  const journeyId = DB.Reports.createJourney(journey);

  DB.Vehicles.setCurrentJourney(vehicle._id, journeyId);
}
