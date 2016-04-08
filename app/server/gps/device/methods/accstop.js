import { DB } from '/server/graphql/db';

export const accStop = (data) => {
  console.log('ACCStop received');
  const vehicle = DB.Vehicles.getByImei(data.imei);
  if (!vehicle) {
    throw new Error("accStop: We cannot find the vehicle for imei:" + data.imei);
  }

  if (!vehicle.currentJourneyId) {
    throw new Error("accStop: We cannot find current journey id of vehicle with imei:" + data.imei);
  }

  const journey = DB.Reports.getJourney(vehicle.currentJourneyId);
  if (!journey) {
    throw new Error("accStop: We cannot find journey with _id:" + vehicle.currentJourneyId);
  }

  const journeyData = {
    stoppedAt: new Date(),
    workedTime: 0,
    movedTime: 0,
    movedDistance: 0,
    idleTime: 0,
    averageVelocity: 0,
    maximumVelocity: 0,
    stoppedAddress: "Adres"
  };

  DB.Reports.updateJourney(journey._id, journeyData);

  DB.Vehicles.setCurrentJourney(vehicle._id, "");
};
