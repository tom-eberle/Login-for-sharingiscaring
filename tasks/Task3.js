/* HSG Weather App */

// Task 3:
// Use `TouchableHighlight` to create a Reload button from the "Reload" `Text` component.
// Touching the reload button should call `_handleReload` function.
//
// Look up the documentation at https://facebook.github.io/react-native/docs/touchablehighlight.html

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reloadButton: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
  },
});

export default class Weather extends Component {
  _handleReload() {
    console.log("TODO: handle reload here");
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          HSG Weather App
        </Text>

        <Text style={styles.reloadButton}>
          Reload
        </Text>

      </View>
    );
  }
}

AppRegistry.registerComponent('weather', () => Weather);
