import { DB } from '/server/graphql/db';
import { buildJourneyGPX } from '../../build_journey_gpx';

import {
  getAddressWithLatlng,
  getWorkedTime,
  getIdleTime,
  getMovedTime,
  getMovedDistance
} from '../../journey_helpers';

export const accStop = (data) => {
  console.log('ACCStop received');

  // vehicle
  const vehicle = DB.Vehicles.getByImei(data.imei);
  if (!vehicle) {
    throw new Error("accStop: We cannot find the vehicle for imei:" + data.imei);
  }

  if (!vehicle.currentJourneyId) {
    throw new Error("accStop: We cannot find current journey id of vehicle with imei:" + data.imei);
  }

  // find out current journey
  const journey = DB.Reports.getJourney(vehicle.currentJourneyId);
  if (!journey) {
    throw new Error("accStop: We cannot find journey with _id:" + vehicle.currentJourneyId);
  }

  const gpx = buildJourneyGPX(vehicle.currentJourneyId, data.imei);

  // gpx dosyasi oldugu icin tracklara ihtiyacimiz kalmadi
  DB.Tracks.deleteByImei(data.imei);

  const workedTime = getWorkedTime(journey.startedAt);
  const idleTime = getIdleTime(data.imei);

  const journeyData = {
    stoppedAt: new Date(),
    workedTime: workedTime,
    movedTime: getMovedTime(workedTime, idleTime),
    movedDistance: getMovedDistance(),
    idleTime: idleTime,
    averageVelocity: 0,
    maximumVelocity: 0,
    stoppedAddress: getAddressWithLatlng(data.latitude, data.longitude),
    gpx: gpx
  };

  // Journey is completed
  DB.Reports.updateJourney(journey._id, journeyData);

  // Remove current journey info from the vehicle
  DB.Vehicles.setCurrentJourney(vehicle._id, "");

  // aracin son konumunu haritada gostermek icin:
  DB.Tracks.create(data);
};
