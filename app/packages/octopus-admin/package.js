Package.describe({
  name: 'octopus-admin',
  version: '0.0.1',
  summary: 'Admin for the Octopus app',
  documentation: null
});

Package.onUse(function(api) {
  api.use('octopus-lib');

  api.use([
  ]);

  api.addFiles([
    'components/Layout.jsx',
    'components/Home.jsx',
    'admin.less',
    'routes.jsx'
  ], 'client');

  api.addFiles([

  ], 'server');
});
