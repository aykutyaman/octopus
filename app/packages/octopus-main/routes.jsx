/* global FlowRouter, ReactLayout, MainLayout, EmbedLayout */

FlowRouter.route('/', {
  name: 'home',
  action() {
    ReactLayout.render(MainLayout, {
      content: <Home />
    });
  }
});

FlowRouter.route('/embed/:deviceId', {
  name: 'embed',
  action() {
    ReactLayout.render(EmbedLayout, {
      content: <App />
    });
  }
});
