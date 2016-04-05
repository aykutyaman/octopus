// schema.js
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} from 'graphql';

//import { Vehicles } from '../../lib/collections';

const Journey = new GraphQLObjectType({
  name: "Report",
  description: "This represent a report",
  fields: () => ({
    plate: {type: new GraphQLNonNull(GraphQLString)},
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
      description: "Aracın çalışma süresi"
    },
    movedTime: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Aracın hareket süresi "
    },
    movedDistance: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Aracın hareket mesafesi"
    },
    idleTime: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Aracın rölanti süresi"
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
    imei: {type: new GraphQLNonNull(GraphQLString)}
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
          count: {type: GraphQLInt}
        },
        resolve: function(source, args, root, ast) {
          // TODO: Filter only requested fields

          //return Vehicles.find().fetch();
          return [
            {
              plate: '06-FP-8328',
              startedAt: new Date(),
              stoppedAt: new Date()
            }
          ];
        }
      }
    })
  })
});

export default schema;
