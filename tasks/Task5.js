/* HSG Weather App */

// Task 5:
// Extract the temperature (main.temp), the name, the id, and the icon identifier (weather[0].icon) from `responeJSON`.

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
    const searchText = this.state.text;
    console.log(`Searching for ${searchText}`);

    // Why not `const url`?
    var url = 'http://api.openweathermap.org/data/2.5/weather?';
    url += 'APPID=c8602d1a56766fde0c75b4e02e3caac7';
    url += '&units=metric'
    url += '&q=' + searchText;

    const encodedURL = encodeURI(url);
    console.log("Fetching data from: " + encodedURL);

    fetch(encodedURL)
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);

      // const temperature = TODO
      // const name = TODO
      // const id = TODO
      // const iconName = TODO

      console.log(`Temperature in ${name} is ${temperature}`);
      console.log(`The unique identifier for ${name} is ${id}`)
      console.log(`Show icon with name ${iconName}.png`);
    })
    .catch((error) => {
      console.log(error);
    });
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
          onChangeText={(newText) => this.setState({text: newText})}
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
