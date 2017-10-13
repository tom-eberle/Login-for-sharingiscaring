
import React, { Component } from 'react';
import firebase from 'firebase'; // Import Firebase login
import { firebaseConfig } from '../config'; // Import of Firebase config
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
  ScrollView,
} from 'react-native'; // Import React-Native elements
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon, Icon } from 'react-native-elements';

import { // Import React-Native UI Kitten Design
  RkButton,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux'; // Probably not useful
import DropdownAlert from 'react-native-dropdownalert'; // Alert component
import validator from "validator"; // Use to validate the forms



// Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
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
  passwordField: {
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
  save: {
    marginVertical: 9
  },
  image: {
    width: 200,
    height: 200
  },
  phone: {
    margin: 10,
  },
});


export default class RegisterInfo extends Component {

    static navigationOptions = {
        title: 'Account information'
      };
    
    // Use constructor to store email and password. 
    constructor(){
      super();
      this.state = {phone: "", lastname :"", firstname : ""};
    }



// Navigation function
    onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
    };


  onNextButton(){

    if (!this.state.firstname.length) {
      console.log(this.state.firstname.length)
      this.dropdown.alertWithType("error", "Error", "Firstname must be provided.");
      return;
    }
    if (!this.state.lastname.length) {
      this.dropdown.alertWithType("error", "Error", "Lastname must be provided.");
      return;
    }
    if (!this.state.phone.length) {
      this.dropdown.alertWithType(
        "error",
        "Error",
        "Phone number must be provided."
      );
      return;
    }
    if (!validator.isMobilePhone(this.state.phone, 'fr-FR')) {
      this.dropdown.alertWithType(
        "error", 
        "Error", 
        "Supply a correct phone number."
      );
      return;
    }





    this.onNavPress('registeraccount_scr')
  } 



  // Visual container and text 
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}} >
        <View style={{flex:1}} > 
          <FormLabel>Enter First Name</FormLabel>
          <FormInput
            value={this.state.firstname}
            placeholder='Maxime'
            textAlign='center'
            onChangeText={(firstname) => {this.setState({firstname}); }}
          />
        </View>
        <View style={{flex:1}} >
          <FormLabel>Enter Last Name</FormLabel>
          <FormInput
            value={this.state.lastname}
            placeholder='Schmit'
            textAlign='center'
            onChangeText={(lastname) => {this.setState({lastname}); }}

          />
        </View>
        </View>
      
        <FormLabel>Enter Phone Number</FormLabel>
        <FormInput
          value={this.state.phone}
          style={styles.phone}
          placeholder='0712345678'
          textAlign='center'
          keyboardType={'phone-pad'}
          onChangeText={(phone) => {this.setState({phone}); }}
          blurOnSubmit
        />

        <FormLabel>  </FormLabel>

        <RkButton
              onPress={() => this.onNextButton()}
              rkType='rounded'
              style={styles.save}>
              PROCEED
        </RkButton>
        <DropdownAlert ref={ref => this.dropdown = ref}/>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('RegisterInfo', () => RegisterInfo);
