import {
  Journeys,
  Vehicles,
  Tracks,
  Companies
} from '/lib/collections';

import { convertMphToKmh } from '/server/gps/distances';
import { powerCutCommand } from '../gps/device/sendCommandToDevice';

export const DB = {
  Reports: {
    getJourneys: function({plates, limit, page, from, to}) {
      const skipNumber = limit * ( page - 1 );
      return Journeys.find({
	plate: {$in: plates},
	startedAt: {$gte: new Date(from)},
	stoppedAt: {$lte: new Date(to)}
      }, {
        skip: skipNumber,
        limit: limit
      }).fetch();
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
    },
    create({companyId, plate, imei}) {
      const createdAt = new Date();
      const company = Companies.findOne({_id: companyId}, {fields: {name: 1}});

      if (!company) {
        throw new Meteor.Error(602, 'Şirket bilgisi bulunamadı.');
      }

      const vehicle = {plate, imei, createdAt, company, powerCut: false};
      const id = Vehicles.insert(vehicle);
      return Vehicles.findOne(id);
    },
    delete(vehicleId) {
      return Vehicles.remove({_id: vehicleId});
    },
    getVehicles({ limit, page }) {
      const skipNumber = limit * ( page - 1 );
      return Vehicles.find({}, {
        skip: skipNumber,
        limit: limit,
        sort: { createdAt: -1 }
      }).fetch();
    },
    updatePowerCutStatus(vehicleId, status) {
      Vehicles.update({_id: vehicleId}, {
        $set: {
          powerCut: status
        }
      });
    },
    powerCut({ imei }) {
      const vehicle = Vehicles.findOne({imei: imei});

      if (!vehicle) {
        throw new Error("Bu imei için bir araç bulunamadı: " + imei);
      }

      const powerCut = vehicle.powerCut || false;
      powerCutCommand(vehicle.imei, powerCut);
      return !powerCut;
    }
  },
  Tracks: {
    create({imei, latitude, longitude, time, speed}) {
      const kmh = convertMphToKmh(speed);
      return Tracks.insert({
        imei: imei,
        speed: kmh,
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
    },
    getIdleCountByImei(imei) {
      return Tracks.find({ imei: imei, speed: 0 }).count();
    },
    getVelocitiesByImei(imei) {
      return Tracks.find({ imei: imei }, {fields: {_id: 0, speed: 1}}).fetch();
    }
  },
  Companies: {
    create({ name }) {
      const createdAt = new Date();
      const company = Companies.findOne({ name: name});

      if (!name) {
        throw new Meteor.Error(602, 'Lütfen bir şirket ismi girin.');
      }

      if (company) {
        throw new Meteor.Error(602, 'Bu şirket ismi mevcut.');
      }

      const newCompany = {name, createdAt};
      const id = Companies.insert(newCompany);

      return Companies.findOne(id);
    }
  }
};
