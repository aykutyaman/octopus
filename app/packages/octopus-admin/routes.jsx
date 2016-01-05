/* global FlowRouter, ReactLayout, Layout */

FlowRouter.route('/admin', {
  name: 'home',
  action() {
    ReactLayout.render(Layout, {
      content: <Home />
    });
  }
});
