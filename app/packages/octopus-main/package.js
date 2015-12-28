Package.describe({
  name: 'octopus-main',
  version: '0.0.1',
  summary: 'Entry point for the Octopus app',
  documentation: null
});

Package.onUse(function(api) {
  api.use('octopus-lib');

  api.use([
    //'bevanhunt:leaflet@1.3.1',
    'octopus-tracks',
    'octopus-gps'
  ]);

  api.addFiles([
    'components/MainLayout.jsx',
    'components/EmbedLayout.jsx',
    'components/App.jsx',
    'components/Home.jsx',
    'components/Map.jsx',
    'routes.jsx'
  ], 'client');

  api.addFiles([
    'bootstrap.js'
  ], 'server');
});
