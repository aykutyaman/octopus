import {
  JourneyReports,
  Vehicles,
  Tracks,
  Companies
} from '/lib/collections';

export const DB = {
  Reports: {
    getJourneys: function({plates, limit, from, to}) {
      return JourneyReports.find({
	plate: {$in: plates},
	startedAt: {$gte: new Date(from)},
	stoppedAt: {$lte: new Date(to)}
      }, {limit: limit}).fetch();
    },
    createJourney: function({plate, imei, startedAddress}) {
      return JourneyReports.insert({
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
        stoppedAddress: 'adres'
      });
    },
    getJourney(journeyId) {
      return JourneyReports.findOne({_id: journeyId});
    },
    updateJourney(journeyId, data) {
      return JourneyReports.update({_id: journeyId}, {
        $set: {
          stoppedAt: data.stoppedAt,
          workedTime: data.workedTime,
          movedTime: data.movedTime,
          movedDistance: data.movedDistance,
          idleTime: data.idleTime,
          averageVelocity: data.averageVelocity,
          maximumVelocity: data.maximumVelocity,
          stoppedAddress: data.stoppedAddress
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
    },
    create({companyId, plate, imei}) {
      const createdAt = new Date();
      const company = Companies.findOne({_id: companyId}, {fields: {name: 1}});

      if (!company) {
        throw new Error('Şirket bilgisi bulunamadı.');
      }

      const vehicle = {plate, imei, createdAt, company};
      Vehicles.insert(vehicle);
      return vehicle;
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
    deleteByImei(imei) {
      Tracks.remove({imei: imei});
    }
  }
};
