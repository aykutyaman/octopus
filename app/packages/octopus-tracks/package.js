Package.describe({
  name: 'octopus-tracks',
  version: '0.0.1',
  summary: 'Tracks collection',
  documentation: null,
});

Package.onUse(function (api) {
  api.use(['octopus-lib']);

  api.addFiles([
    'tracks.js',
    'methods.js',
  ]);

  api.addFiles('publications.js', 'server');

  api.export('Tracks');
});

Package.onTest(function (api) {
  api.use([
    'octopus-test-lib',
    'octopus-tracks'
  ]);

  //api.addFiles('todos-tests.js', 'server');
});
