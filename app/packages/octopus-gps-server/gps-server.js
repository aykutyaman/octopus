/* eslint-disable no-console */
/* global  Meteor console net */
GPS = {};


// class Server {
//   constructor(config) {

    // this._netServer = config.net.createServer((connection) => {
    //     console.log('hello connection');

    //     connection.on('data', (data) => {
    //       // (598919346314BP05000012341234123140607A3330.4288S07036.8518W019.2230104172.3900000000L00019C2C)
    //       console.log(data.toString());
    //     });

    //     connection.on('end', () => {
    //       console.log('hello world');
    //     });
    //   });


    // this._netServer.listen(8090, () => {
    //   console.log('server bound');
    // });
//   }
// }

GPS.server = Npm.require("gps-tracking").server;
