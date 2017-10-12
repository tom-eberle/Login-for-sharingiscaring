/* HSG Weather App */

// Task 6:
// Create a new object (called location) with the previously extracted data
// (temperature, name, id, icon identifier) and add it to the app's `locations` array.

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
      text: null,
      locations: [],
    };
  }

  _handleReload() {
    console.warn("TODO: Implement reload");
  }

  _handleSearch() {
    const searchText = this.state.text;
    console.log(`Searching for ${searchText}`);

    var url = 'http://api.openweathermap.org/data/2.5/weather?';
    url += 'APPID=c8602d1a56766fde0c75b4e02e3caac7';
    url += '&units=metric'
    url += '&q=' + searchText;

    const encodedURL = encodeURI(url);
    console.log("Fetching data from: " + encodedURL);

    fetch(encodedURL)
    .then((response) => response.json())
    .then((responseJSON) => {
      const temperature = responseJSON.main.temp;
      const name = responseJSON.name;
      const id = responseJSON.id;
      const iconName = responseJSON.weather[0].icon;

      console.log(`Temperature in ${name} is ${temperature}`);
      console.log(`The unique identifier for ${name} is ${id}`)
      console.log(`Show icon with name ${iconName}.png`);

      // Task 6: Replace the TODOs
      const location = {
        // 'temperature': TODO,
        // 'name': TODO,
        // 'id': TODO,
        // 'iconName': TODO,
      };

      const locations = null; // TODO: Get the current locations from the app state and assign it to `locations`
      // TODO: Add the new `location` element to the `locations` array.
      // Hint: Google "javascript add element to array"

      console.log("The app should display the weather data for the following locations");
      console.log(locations);

      // TODO: Use this.setState() to update the app's locations array accordingly.
      // Make sure that it works by adding multiple locations and see if they're logged to the console.
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
