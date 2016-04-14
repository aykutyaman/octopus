import {
  Journeys,
  Vehicles,
  Tracks
} from '/lib/collections';


export const DB = {
  Reports: {
    getJourneys: function({plates, limit, from, to}) {
      return Journeys.find({
	plate: {$in: plates},
	startedAt: {$gte: new Date(from)},
	stoppedAt: {$lte: new Date(to)}
      }, {limit: limit}).fetch();
    },
    createJourney: function({plate, imei, startedAddress}) {
      return Journeys.insert({
        plate: plate,
        imei: imei,
        startedAt: new Date(),
        stoppedAt: '',
        workedTime: 0,
        movedTime: 0,
        movedDistance: 0,
        idleTime: 0,
        averageVelocity: 0,
        maximumVelocity: 0,
        startedAddress: startedAddress,
        stoppedAddress: 'adres',
        gpx: ''
      });
    },
    getJourney(journeyId) {
      return Journeys.findOne({_id: journeyId});
    },
    updateJourney(journeyId, data) {
      return Journeys.update({_id: journeyId}, {
        $set: {
          stoppedAt: data.stoppedAt,
          workedTime: data.workedTime,
          movedTime: data.movedTime,
          movedDistance: data.movedDistance,
          idleTime: data.idleTime,
          averageVelocity: data.averageVelocity,
          maximumVelocity: data.maximumVelocity,
          stoppedAddress: data.stoppedAddress,
          gpx: data.gpx
        }
      });
    }
  },
  Vehicles: {
    getByImei(imei) {
      return Vehicles.findOne({imei: imei});
    },
    setCurrentJourney(vehicleId, journeyId) {
      Vehicles.update({_id: vehicleId}, {
        $set: {
          currentJourneyId: journeyId
        }
      });
    }
  },
  Tracks: {
    create({imei, latitude, longitude, time, speed}) {
      return Tracks.insert({
        imei: imei,
        speed: speed,
        location: {
          coordinates: [latitude, longitude],
	  type: 'Point'
        },
        createdAt: time
      });
    },
    /**
     * Verili tarihten daha eski olan tum tracklari sil
     */
    deleteByDate(date) {
      Tracks.remove({createdAt: {$lte: date}});
    },
    deleteByImei(imei) {
      Tracks.remove({imei: imei});
    },
    getByImei(imei) {
      return Tracks.find({imei: imei}).fetch();
    },
    getCoordinatesByImei(imei) {
      const tracks = DB.Tracks.getByImei(imei);
      // XXX: refactor
      const coordinates = [];
      tracks.forEach(track => {
        coordinates.push({
          latitude: track.location.coordinates[0],
          longitude: track.location.coordinates[1]
        });
      });
      return coordinates;
    }
  }
};
