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
    'components/AdminLayout.jsx',
    'components/AppLeftNav.jsx',
    'components/Home.jsx',
    'components/Login.jsx',
    'components/CompaniesContainer.jsx',
    'components/VehiclesContainer.jsx',
    'admin.less',
    'routes.jsx'
  ], 'client');

  api.addFiles([
    'startup.jsx',
    'publications.js'
  ], 'server');

  api.addFiles([
    'companies/collections.js',
    'companies/methods.js',
    'vehicles/collections.js',
    'vehicles/methods.js'
  ]);
});
