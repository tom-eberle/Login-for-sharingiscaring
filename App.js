import Expo from 'expo';
import React from 'react';

import LoginScreen from './screens/LoginScreen';
import RegisterAccount from './screens/RegisterAccount';
import RegisterInfo from './screens/RegisterInfo';
import ResetPassword from './screens/ResetPassword';

import { TabNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, View } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});


export default class App extends React.Component {
  

    render() {
      const MainNavigator = StackNavigator({
        login_scr: { screen: LoginScreen },
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