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
        // XXX: Why there is errors here?
        if (result.errors) console.log(result);
        f.return(result);
      })
      .catch(error => {// XXX: Why does not throw exception?
        f.throw(error);
      });

    return f.wait();
  }
});
