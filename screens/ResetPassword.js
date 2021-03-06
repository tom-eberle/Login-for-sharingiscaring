
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
  image: {
    width: 200,
    height: 200
  },
  enterMail: {
    marginVertical: 15,
  },
  enterMailInput: {
  },
  resetButton: {
  },
});


export default class ResetPassword extends Component {

    static navigationOptions = {
        title: 'Reset password'
      };

    // Use constructor to store email and password. 
    constructor(){
      super();
      this.state = {email :""};
    }

   // Navigation function
  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
    };

  // Reset the password based on the email
  resetPassword = async () => {
    console.log("Reset button pressed")

    try { // Request firebase to send a reset email.  
      console.log(this.state.email)
      await firebase.auth().sendPasswordResetEmail(this.state.email)
      console.log('Reset')
      this.dropdown.alertWithType('success', 'Success', "Check your emails");
    }
    catch (error) {
      console.log(error)
      let err_message = error.message

      if (err_message) { // Display error
        this.dropdown.alertWithType('error', 'Error', err_message);
      }
    
    }
  }

  // Visual container and text 
  render() {
    return (
    <ScrollView contentContainerStyle={styles.container}>
     


        <FormLabel style={styles.enterMail}>Enter your email adress</FormLabel>
        <FormInput
          value={this.props.email}
          style={styles.enterMailInput}
          placeholder='maxime.schmitt@student.unisg.ch'
          textAlign='center'
          onChangeText={(email) => this.setState({email : email})}
          returnKeyType="send"
          onSubmitEditing={() => this.resetPassword()}
        />

        <FormLabel>  </FormLabel>
        
        <RkButton
              onPress={() => this.resetPassword()}
              rkType='rounded'
              disabled={false}
              style={styles.resetButton}>
              RESET
        </RkButton>
            
        <DropdownAlert ref={ref => this.dropdown = ref}/>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('ResetPassword', () => ResetPassword);
