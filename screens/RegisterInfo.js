
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


// Initialise and display Firebase info in console, be sure that we have the right config. 
 //   console.log(firebaseConfig);
  //  firebase.initializeApp(firebaseConfig);
 //   console.log("Firebase initialised")



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
      this.state = {isLoggedIn : false, email :"", password : "", firstname :"", lastname : "", phone : ""};
    }



// Navigation function
    onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
    };


  // Sending info to firebase
  _signupUser = async () => {

      var firstname = this.state.firstname
      var lastname = this.state.lastname
      var displayName = firstname + ' ' + lastname;
      var email = this.state.email
      var password = this.state.password
      var phone = this.state.phone
      console.log(email);
      console.log(password);
      console.log(displayName);
      console.log(phone);
  
      try {
        let user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        user.updateProfile({ displayName });
        // write user properties to firebase
        firebase.database().ref(`/users/${user.uid}/userDetails`).set({
          email,
          phone,
          firstname,
          lastname,
          displayName
        });
        console.log(user);
      }
      catch (error) {
        console.log(error);
      }
  
  };




  // Visual container and text 
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}} >
        <View style={{flex:1}} > 
          <FormLabel>Enter First Name</FormLabel>
          <FormInput
            value={this.props.firstname}
            placeholder='Maxime'
            onChangeText={(firstname) => this.setState({firstname : firstname})}
            
          />
        </View>
        <View style={{flex:1}} >
          <FormLabel>Enter Last Name</FormLabel>
          <FormInput
            value={this.props.lastname}
            placeholder='Schmit'
            onChangeText={(lastname) => this.setState({lastname : lastname})}

          />
        </View>
        </View>
      
        <FormLabel>Enter Phone Number</FormLabel>
        <FormInput
          value={this.props.phone}
          style={styles.phone}
          placeholder='+(41)712345678'
          keyboardType={'phone-pad'}
          onChangeText={(phone) => this.setState({phone : phone})}
          blurOnSubmit
        />

        <FormLabel>  </FormLabel>

        <RkButton
              onPress={() => this.onNavPress('registeraccount_scr')}
              rkType='rounded'
              style={styles.save}>
              PROCEED
        </RkButton>
             
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('RegisterInfo', () => RegisterInfo);
