/* HSG Weather App */

// Task 7:
// Add a ListView.DataSource, see https://facebook.github.io/react-native/docs/listview.html for help.

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, TouchableHighlight, TextInput, ListView } from 'react-native';

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
  listView: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
});

export default class Weather extends Component {

  constructor() {
    super();

    const myDataSource = null; // TODO Task 7

    this.state = {
      text: null,
      locations: [],
      dataSource: myDataSource,
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

      const location = {
        'temperature': temperature,
        'name': name,
        'id': id,
        'iconName': iconName,
      };

      const locations = this.state.locations;
      locations.push(location);

      console.log("The app should display the weather data for the following locations:");
      console.log(locations);

      this.setState({
        locations: locations,
        // TODO Task 7: Update the dataSource here
      });
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

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.name} {rowData.temperature}</Text>}
          enableEmptySections={true}
          style={styles.listView}
        />

      </View>
    );
  }
}

AppRegistry.registerComponent('weather', () => Weather);
