Package.describe({
  name: 'octopus-test-lib',
  summary: 'Common dependencies of all app tests',
  documentation: null,
});

Package.onUse(function(api) {
  api.imply([
    'octopus-lib',
    'practicalmeteor:mocha@2.1.0_5',
    'practicalmeteor:chai@2.1.0_1',
    'practicalmeteor:sinon@1.14.1_2',
    'publication-collector',
    'factory',
    'stub-collections',
    'ddp',
    'check'
  ]);
});
