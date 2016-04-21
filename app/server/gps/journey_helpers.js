import moment from 'moment';
import { calcDistanceWithLocations } from '/server/gps/distances';
import { DB } from '/server/graphql/db';

export const getAddressWithLatlng = (lat, lng) => {
  try {
    return Meteor.call('getFormattedAddress', lat, lng);
  } catch (e) {
    console.log('Adres bilgisi alınırken hata oluştu.');
  }
};

export const getWorkedTime = (startedAt) => {
  const workedTime = moment.duration(moment().diff(startedAt));
  const workedTimeAsSeconds = workedTime.asSeconds();
  return Math.round(workedTimeAsSeconds);
};

export const getIdleTime = (imei) => {
  const idleCount = DB.Tracks.getIdleCountByImei(imei);
  return idleCount * 5;
};

export const getMovedTime = (workedTime, idleTime) => {
  return workedTime - idleTime;
};

export const getMovedDistance = (imei) => {
  const coordinates = DB.Tracks.getCoordinatesByImei(imei);
  return calcDistanceWithLocations(coordinates);
};

export const getMaxVelocity = (imei) => {
  const velocities = DB.Tracks.getVelocitiesByImei(imei);
  const velocitiesArray = _.pluck(velocities, 'speed');

  return velocitiesArray.length ? _.max(velocitiesArray) : 0;
};

export const getAverageVelocity = (movedDistanceAsKm, movedTimeAsSeconds) => {
  const movedTimeAsHours = movedTimeAsSeconds / 3600;
  const averageVelocity = movedDistanceAsKm / movedTimeAsHours;

  return _.isNumber(averageVelocity) ? Math.floor(averageVelocity) : 0;
};
