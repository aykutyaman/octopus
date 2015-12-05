Package.describe({
  name: 'octopus-main',
  version: '0.0.1',
  summary: 'Entry point for the Octopus app',
  documentation: null
});

Package.onUse(function(api) {
  api.use("octopus-lib");

  api.addFiles([
    "bootstrap.js"
  ], "server");
});
