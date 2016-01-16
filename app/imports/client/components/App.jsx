import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import { MapContainer } from './Map.jsx';
import { AppLeftNav } from './AppLeftNav.jsx';

export const App = React.createClass({
  render() {
    const styles = {
      zIndex: 1401
    };
    const mainStyles = {
      paddingLeft: 256
    };
    return (
      <div>
	<AppBar style={styles} title='Octopus' />
	<div style={mainStyles}>
	  <MapContainer />
	</div>
	<AppLeftNav />
      </div>
    );
  }
});
