/* eslint-env mocha */
/* globals chai Factory */

const assert = chai.assert;

const net = Npm.require('net');

const config = {
  net: {
    createServer() {},
    listen() {}
  },
  port: 8090
}

describe('GPS.Server', () => {
  describe('constructor throw exception when', () => {
    describe('config object parameters', () => {

      chai.expect(() => {
        new GPS.Server();
      }).to.throw('Expected object, got undefined');

    })
  });
});



// const config1 = {};
// const myGPSServer1 = new GPS.Server(config1)
//         .on('track', (socket) => {}) // or ping||message
//         .on('data', (rawData) => {}) // raw data
//         .on('connect', (socket) => {}) //
//         .on('disconnect', (socket) => {}) // or tracker-disconnected
//         .on('loginRequest', (data) => {})
//         .on('error', () => {})
//         .on('log', () => {})
//         .on('timeOut', () => {});

// myGPSServer1.listen(8090);


    // //console.log(sinon.net);
    // const config = {
    //   net: {
    //     listen() {
    //       return this;
    //     },
    //     createServer() {

    //     }
    //   }
    // };
