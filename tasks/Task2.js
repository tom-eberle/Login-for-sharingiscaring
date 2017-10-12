/* HSG Weather App */

// Task 2:
// Add a `Text` component to our main view that contains the title "HSG Weather App" and apply the style `title` from our StyleSheet to it.

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  title: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default class Weather extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
       Test Text
      </Text>
      </View>
      
    );
  }
}

AppRegistry.registerComponent('weather', () => Weather);
