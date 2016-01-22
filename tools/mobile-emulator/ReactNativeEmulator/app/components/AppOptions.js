/*
 main.js'ye ekledim ancak bir turlu calismiyor. Ancak hata da vermiyor.
*/

'use strict';

import React, {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text
} from 'react-native';

let icon = require('../images/fa-cog/fa-cog.png');

export const AppOptions = React.createClass({
  render() {
    console.log('hello app options');
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handleOptions}
        >helloz
        <Image
          source={icon}
          style={styles.icon}
          />
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    marginRight: 8
  },
  icon: {
    tintColor: 'rgba(0, 0, 0, 0.5)'
  }
});
