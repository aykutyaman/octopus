Package.describe({
  name: 'octopus-gps',
  version: '0.0.1',
  summary: 'Entry point for the Octopus GPS',
  documentation: null
});

Package.onUse(function(api) {
  api.use('octopus-lib');

  api.use(['octopus-gps-server'], 'server');

  //api.export('GPS', 'server');

});
