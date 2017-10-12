/* HSG Weather App */

// Explain `constructor` and `this.state`

// Task 4:
// Add `onChangeText` to <TextInput> to change the `text` within `this.state`.
//
// Hint:
// Lookup the documentation at https://facebook.github.io/react-native/docs/textinput.html

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, TouchableHighlight, TextInput } from 'react-native';

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
  reloadButton: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
  },
  searchField: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default class Weather extends Component {

  constructor() {
    super();

    this.state = {
      text: null
    };
  }

  _handleReload() {
    console.warn("TODO: Implement reload");
  }

  _handleSearch() {
    console.warn(`TODO: Search for ${this.state.text}`);
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          HSG Weather App
        </Text>

        <TouchableHighlight onPress={() => this._handleReload()}>
          <Text style={styles.reloadButton}>
            Reload
          </Text>
        </TouchableHighlight>

        <TextInput
          style={styles.searchField}
          onSubmitEditing={() => this._handleSearch()}
          placeholder="Enter a city name"
          autoCapitalize={'none'}
          autoCorrect={false}
          value={this.state.text}
        />
    </View>
    );
  }
}

AppRegistry.registerComponent('weather', () => Weather);
