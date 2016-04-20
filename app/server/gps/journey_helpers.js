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
  return workedTime.asSeconds();
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
