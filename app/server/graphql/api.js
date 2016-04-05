import { Picker } from 'meteor/meteorhacks:picker';
import bodyParser from 'body-parser';
import { RenderIde } from './render_ide';
import schema from './schema';
import { graphql } from 'graphql';


//https://github.com/kadirahq/meteor-graphql/blob/master/server/ide.js
//https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.12owza4qi
//https://github.com/kadirahq/graphql-blog-schema/blob/master/src/schema.js
Picker.middleware(bodyParser.text({ type: 'application/graphql' }));
Picker.middleware(bodyParser.json());

Picker.route('/graphql', function(params, req, res, next) {
  if (req.method === "POST") {
    graphql(schema, req.body)
      .then((result) => {
        res.end(JSON.stringify(result, null, 2));
      });
  } else {
    res.writeHead(500);
    res.end("Sadece POST sorgusu yapabilirsiniz. ");
  }
});


Picker.route('/graphql/ide', (params, req, res) => {
  if(req.method === 'GET') {
    const {query, variables} = params.query;
    const html = RenderIde({query, variables});
    res.end(html);
  } else {
    try {
      const {query, variables, operationName} = req.body;
      const variablesJson = (variables) ? JSON.parse(variables) : {};

      //return;
      const response = Meteor.call(
        'graphql.transport', query, variablesJson, operationName
      );

      const json = JSON.stringify(response);
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(json);
    } catch(ex) {
      console.error(ex.stack);
      res.writeHead(500);
      res.end("Internal Error");
    }
  }
});
