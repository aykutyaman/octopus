import { graphql } from 'graphql';
import Future from 'fibers/future';
import schema from './schema';

Meteor.methods({
  'graphql.transport'(query, vars, operationName) {
    check(query, String);
    check(vars, Match.OneOf(Object, undefined, null));
    check(operationName, Match.OneOf(String, undefined, null));

    const rootValue = {userId: "aykutUserId"};
    const f = new Future();

    graphql(schema, query, rootValue, vars, operationName)
      .then(result => {
        f.return(result);
      })
      .catch(error => {
        f.throw(error);
      });

    return f.wait();
  }
});
