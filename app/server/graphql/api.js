import {Picker} from 'meteor/meteorhacks:picker';


//https://github.com/kadirahq/meteor-graphql/blob/master/server/ide.js
//https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.12owza4qi
Picker.route('/graphql', function(params, req, res, next) {
  if (req.method === "POST") {
    res.end('you are the man!');
  } else {
    console.log('only post');
    res.writeHead(500);
    res.end("Sadece POST sorgusu yapabilirsiniz. ");
  }
});
