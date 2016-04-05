// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} from 'graphql';

let count = 127;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root of schema',
    fields: () => ({
      hello: {
        type: GraphQLString,
        description: 'Count of',
        resolve: function() {
          return ' world!';
        }
      }
    })
  })
});

export default schema;
