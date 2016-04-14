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

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
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
  })
});

export default schema;
