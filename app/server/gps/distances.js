const getDistanceBetweenTwoLatlngPoints = ( latlng1, latlng2, unit) => {
  // latLng1
  const lat1 = latlng1.latitude;
  const lng1 = latlng1.longitude;

  // latLng2
  const lat2 = latlng2.latitude;
  const lng2 = latlng2.longitude;

  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lng1 - lng2;
  const radtheta = Math.PI * theta / 180;

  let dist = Math.sin( radlat1 ) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;

  // 'K' is kilometers
  if (unit === 'K') {
    dist = dist * 1.609344;
  }

  // 'N' is nautical miles
  if (unit === 'N') {
    dist = dist * 0.8684;
  }

  // 'M' is statute miles (default)
  return dist;
};

export const calcDistanceWithLocations = ( coordinates ) => {
  let totalDistance = 0;

  for ( let i = 0; i < coordinates.length - 1; i++ ) {
    const latlng1 = coordinates[ i ];
    const latlng2 = coordinates[ i + 1 ];

    const distance = getDistanceBetweenTwoLatlngPoints(latlng1, latlng2, 'K');
    totalDistance += distance;
  }

  return totalDistance;
};

export const convertMphToKmh = (mph) => {
  const kmh = mph * 1.609344;
  return Math.round(kmh);
}
