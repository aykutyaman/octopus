import { FlowRouter } from 'kadira:flow-router';
import { ReactLayout } from 'kadira:react-layout';


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
