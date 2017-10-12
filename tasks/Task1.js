import React, { Component } from 'react';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import {
  Alert,
  AppRegistry,
  ListView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

// Initialise and display Firebase in console 
    console.log(firebaseConfig);
    firebase.initializeApp(firebaseConfig);

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
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
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
  },
  loginField: {
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

export default class Login extends Component {

  constructor() {
    super();

    const myDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      const rowNeedsUpdate = r1.isDirty || r2.isDirty;
      r1.isDirty = r2.isDirty = false; // Reset dirty flags
      console.log(`Row needs update? ${r1 !== r2 || rowNeedsUpdate}`);
      return r1 !== r2 || rowNeedsUpdate;
    }});

    this.state = {
      text: null,
      locations: [],
      dataSource: myDataSource,
    };
  }

  _renderRow(rowData) {
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

  _renderSeparator(sectionID, rowID) {
    const sectionRowKey = sectionID + '-' + rowID;
    return (<View key={sectionRowKey} style={{height: 1, backgroundColor: 'gray'}} />);
  }

  _handleReload() {
    console.log("TODO: Handle reload");
  }

  _handleSearch() {
    const searchText = this.state.text;

    console.log("Search the OpenWeatherAPI for: " + searchText)

    var url = 'http://api.openweathermap.org/data/2.5/weather?';
    url += 'APPID=c8602d1a56766fde0c75b4e02e3caac7';
    url += '&units=metric'
    url += '&q=' + searchText;

    const encodedURL = encodeURI(url);
    console.log("Fetching data from: " + encodedURL);

    fetch(encodedURL)
    .then((response) => response.json())
    .then((responseJSON) => {
      const mainJSONObject = responseJSON.main;

      const temperature = mainJSONObject.temp;
      const name = responseJSON.name;
      const id = responseJSON.id;

      const weatherJSONObject = responseJSON.weather[0];
      const iconName = weatherJSONObject.icon;

      console.log(`Temperature in ${name} is ${temperature}`);
      console.log(`Show icon with name ${iconName}.png`);

      const location = {
        'temperature': temperature,
        'name': name,
        'id': id,
        'iconName': iconName,
        'isDirty': true, // Mark new locations as dirty by default.
      };

      const locations = this.state.locations;
      locations.push(location);

      this.setState({
        locations: locations,
        dataSource: this.state.dataSource.cloneWithRows(locations),
      });
    })
    .catch((error) => {
      console.log(error);

      Alert.alert(
        'Error',
        `No weather data found for ${searchText}`,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}]
      );
    });
  }

  // Visual container and text 
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          Sharing is Caring
        </Text>

       

        <TextInput
          style={styles.loginField}
          onChangeText={(text) => this.setState({text})}
          placeholder="Enter login"
          onSubmitEditing={() => this._handleSearch()}
          autoCorrect={false}
          autoCapitalize={'none'}
          value={this.state.text}
        />

        <TextInput
          style={styles.loginField}
          onChangeText={(text) => this.setState({text})}
          placeholder="Enter password"
          onSubmitEditing={() => this._handleSearch()}
          autoCorrect={false}
          autoCapitalize={'none'}
          value={this.state.text}
        />

        <TouchableHighlight onPress={() => this._handleReload()}>
          <Text style={styles.reloadButton}>
            Reload
          </Text>
        </TouchableHighlight>
             

      </View>
    );
  }
}

AppRegistry.registerComponent('login', () => Login);

