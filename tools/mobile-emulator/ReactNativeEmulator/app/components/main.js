'use strict';
let DeviceInfo = require('react-native-device-info');

import React, {
  StyleSheet,
  View,
  Navigator,
  Text
} from 'react-native';

import { SendLocation } from './SendLocation.js';
import { AppOptions } from './AppOptions.js';

export const Main = React.createClass({
  // configuration
  displayName: 'Main',
  watchID: null,
  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  },
  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },
  renderScene(route, navigator) {
    let Component = route.component;

    let title = {};
    if (route.title) {
      title.title = route.title;
    }

    return (
      <View style={styles.container}>
      <Component
      navigator={navigator}
      {...route.passProps}
      />
      </View>
    );
  },

  // Navigator Config
  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.HorizontalSwipeJump;
  },
  render() {
    const id = DeviceInfo.getUniqueID();
    return (
      <Navigator
      initialRoute={{
        component: SendLocation,
        title: "Lokasyon Bildir",
	leftButton: <AppOptions />
      }}
      renderScene={this.renderScene}
      configureScene={this.configureScene}
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    //color: '#333333',
    marginBottom: 5,
  },
});
