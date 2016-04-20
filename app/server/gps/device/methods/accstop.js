import { DB } from '/server/graphql/db';
import { buildJourneyGPX } from '../../build_journey_gpx';
import moment from 'moment';
import { calcDistanceWithLocations } from '/server/gps/distances';

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

  // find addres
  const latlng = data.latitude + ',' + data.longitude;
  const address = Meteor.call('getFormattedAddress', latlng);

  // start-stop date
  const startedAt = journey.startedAt;
  const stoppedAt = new Date();

  // workedTime
  const workedTime = moment.duration(moment().diff(startedAt));
  const workedTimeAsSeconds = workedTime.asSeconds();

  // idleTime
  // 5 saniyede bir gps'den sinyal aldığımız için 5 ile çarptık;
  const idleTimeAsSeconds = DB.Tracks.getIdleCountByImei(data.imei) * 5;

  // movedTime
  const movedTimeAsSeconds = workedTimeAsSeconds - idleTimeAsSeconds;

  // moved distance
  const coordinates = DB.Tracks.getCoordinatesByImei(data.imei);
  const movedDistance = calcDistanceWithLocations(coordinates);

  // gpx dosyasi oldugu icin tracklara ihtiyacimiz kalmadi
  DB.Tracks.deleteByImei(data.imei);

  const journeyData = {
    stoppedAt: stoppedAt,
    workedTime: workedTimeAsSeconds,
    movedTime: movedTimeAsSeconds,
    movedDistance: movedDistance,
    idleTime: idleTimeAsSeconds,
    averageVelocity: 0,
    maximumVelocity: 0,
    stoppedAddress: address,
    gpx: gpx
  };

  // Journey is completed
  DB.Reports.updateJourney(journey._id, journeyData);

  // Remove current journey info from the vehicle
  DB.Vehicles.setCurrentJourney(vehicle._id, "");

  // aracin son konumunu haritada gostermek icin:
  DB.Tracks.create(data);
};
