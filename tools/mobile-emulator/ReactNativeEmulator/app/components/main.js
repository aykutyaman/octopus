'use strict';
let DeviceInfo = require('react-native-device-info');

import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

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
    console.log(navigator);
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
  render() {
    const id = DeviceInfo.getUniqueID();
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        Welcome to {id}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
        <Text> Current position: </Text>
        {this.state.lastPosition}
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
