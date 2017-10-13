import Expo from 'expo';
import React from 'react';

import LoginScreen from './screens/LoginScreen';
import RegisterAccount from './screens/RegisterAccount';
import RegisterInfo from './screens/RegisterInfo';
import ResetPassword from './screens/ResetPassword';

import { TabNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, View } from 'react-native';

import firebase from 'firebase'; // Import Firebase login
import { firebaseConfig } from './config'; // Import of Firebase config


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

// Initialise and display Firebase info in console, be sure that we have the right config. 
console.log(firebaseConfig);
firebase.initializeApp(firebaseConfig);
console.log("Firebase initialised")



export default class App extends React.Component {
  

    render() {
      const MainNavigator = StackNavigator({
        login_scr: { screen: LoginScreen }, // This one is the first screen
        registeraccount_scr: { screen: RegisterAccount },
        registerinfo_scr: { screen: RegisterInfo },
        reset_scr: { screen: ResetPassword },
        });

        return (
        
          <View style={styles.container}>
            <MainNavigator />
          </View>
        
        );
  
    }
  }