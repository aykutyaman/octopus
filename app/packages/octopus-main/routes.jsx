/* global FlowRouter, ReactLayout, MainLayout, EmbedLayout */

FlowRouter.route('/', {
  name: 'home',
  action() {
    ReactLayout.render(MainLayout, {
      content() {
	return <Home />
      }
    });
  }
});

FlowRouter.route('/embed/:deviceId', {
  name: 'embed',
  action() {
    ReactLayout.render(MainLayout, {
      content() {
	return <App />
      }
    });
  }
});
