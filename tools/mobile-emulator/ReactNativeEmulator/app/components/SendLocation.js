'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  PixelRatio,
  TouchableOpacity
} from 'react-native';


export const SendLocation = React.createClass({
  handleSubmit() {
    alert(this.state.IMEI);
  },
  render() {
    return (
      <View>
      <TextInput
      ref='input'
      style={styles.input}
      placeholder='IMEI'
      onChangeText={(IMEI) => this.setState({IMEI: IMEI})}
      />

      <TouchableOpacity
      onPress={this.handleSubmit}
      >
      <Text>
      Lokasyon göndermeye başla
      </Text>
      </TouchableOpacity>

      </View>
    );
  }
});


const styles = StyleSheet.create({
  input: {
    flex: 1,
    //height: 20
  },
  border: {
    height: 1 / PixelRatio.get(),
  },
});
