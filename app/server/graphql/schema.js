// schema.js
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} from 'graphql';

import CustomGraphQLDateType from 'graphql-custom-datetype';

import { DB } from './db';

const Journey = new GraphQLObjectType({
  name: "Report",
  description: "This represent a report",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "journey id"
    },
    plate: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Aracın plakası"
    },
    imei: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Araç IMEI"
    },
    startedAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Aracın seyahate başladığı tarih"
    },
    stoppedAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Aracın seyahati tamamladığı tarih"
    },
    workedTime: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Aracın çalışma süresi (dakika)"
    },
    movedTime: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Aracın hareket süresi (dakika)"
    },
    movedDistance: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Aracın hareket mesafesi (km)"
    },
    idleTime: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Aracın rölanti süresi (dakika)"
    },
    averageVelocity: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Aracın ortalama hızı"
    },
    maximumVelocity: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Aracın maksimum hızı"
    },
    startedAddress: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Aracın hareket başlangıç adresi"
    },
    stoppedAddress: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Aracın hareket bitiş adresi"
    },
    gpx: {
      type: GraphQLString,
      description: "Seyahat dosyası"
    }
  })
});


const Company = new GraphQLObjectType({
  name: 'Company',
  description: 'This represent a company',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Şirket id'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Şirket ismi'
    }
  })
});

const Vehicle = new GraphQLObjectType({
  name: 'Vehicle',
  description: 'This represent a vehicle',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Aracın idsi'
    },
    plate: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Aracın plakası'
    },
    imei: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Araç IMEI'
    },
    company: {
      type: Company,
      description: 'Aracın şirketi'
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'reportSchemas',
  description: 'Root of schema',
  fields: () => ({
    journeyReports: {
      type: new GraphQLList(Journey),
      args: {
        limit: {
          type: GraphQLInt,
          defaultValue: 5
        },
        from: {
          type: CustomGraphQLDateType,
          description: "Sorgu başlangıç tarihi"
        },
        to: {
          type: CustomGraphQLDateType,
          description: "Sorgu bitiş tarihi"
        },
        plates: {
          type: new GraphQLList(GraphQLString)
        }
      },
      resolve: function(source, {plates, limit, from, to}, root, ast) {
        return DB.Reports.getJourneys({plates, limit, from, to});
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'VehicleMutations',
  description: 'Mutations of vehicles',
  fields: {
    newVehicle: {
      type: Vehicle,
      args: {
        companyId: {type: new GraphQLNonNull(GraphQLString)},
        plate: {type: new GraphQLNonNull(GraphQLString)},
        imei: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, args) => {
        const asyncCreateVehicle = async () => DB.Vehicles.create(args);
        return asyncCreateVehicle();
      }
    },
    deleteVehicle: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        vehicleId: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {vehicleId}) => {
        const asyncDeleteVehicle = async () => DB.Vehicles.delete(vehicleId);
        return asyncDeleteVehicle();
      }
    }
  }
});

let schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default schema;
