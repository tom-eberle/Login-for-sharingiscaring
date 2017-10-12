/* HSG Weather App */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, TouchableHighlight, TextInput, ListView, Image } from 'react-native';

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
  listViewRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  rowName: {
    padding: 10,
    fontSize: 16,
  },
  rowTemperature: {
    padding: 10,
    fontSize: 16,
  },
});

export default class Weather extends Component {

  constructor() {
    super();

    const myDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      return r1 !== r2;
    }});

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
        dataSource: this.state.dataSource.cloneWithRows(locations),
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  _renderListViewRow(rowData) {
    return (
      <View style={styles.listViewRow}>
        <Text style={styles.rowName}>{rowData.name}</Text>
        <Text style={styles.rowTemperature}>{rowData.temperature} °C</Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'http://openweathermap.org/img/w/' + rowData.iconName + '.png'}}
        />
      </View>
    );
  }

  _renderListViewSeparator(sectionID, rowID) {
    const sectionRowKey = sectionID + '-' + rowID;
    return (<View key={sectionRowKey} style={{height: 1, backgroundColor: 'gray'}} />);
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
          renderRow={(rowData) => this._renderListViewRow(rowData)}
          renderSeparator={this._renderListViewSeparator}
          enableEmptySections={true}
          style={styles.listView}
        />

      </View>
    );
  }
}

AppRegistry.registerComponent('weather', () => Weather);
