Package.describe({
  name: 'octopus-gps-server',
  version: '0.0.1',
  summary: 'Octopus GPS Server',
  documentation: null
});

Npm.depends({
  "gps-tracking": "1.0.10"
});

Package.onUse(function(api) {

  api.use(['octopus-lib']);

  api.addFiles([
    'gps-server.js'
  ], 'server');

  api.export('GPS', 'server');
});

Package.onTest(function (api) {
  api.use([
    'octopus-test-lib',
    'octopus-gps-server'
  ]);

  //api.addFiles('gps-server-tests.js', 'server');
});
