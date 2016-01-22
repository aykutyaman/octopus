'use strict';

import React, {
  AppRegistry
} from 'react-native';

import { Main } from './app/components/main.js';

const ReactNativeEmulator = React.createClass({
  render() {
    return (
      <Main />
    );
  }
});

AppRegistry.registerComponent('ReactNativeEmulator', () => ReactNativeEmulator);
