
import React, { Component, PropTypes } from 'react';
import firebase from 'firebase'; // Import Firebase login
import { firebaseConfig } from '../config/firebase_config.js'; // Import of Firebase config
import {
  Alert,
  AppRegistry,
  ListView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity, // Used for the "regiter button" width
  View,
  Dimensions // Used for the "regiter button" width
} from 'react-native'; // Import React-Native elements
import { // Import React-Native UI Kitten Design
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import { connect } from 'react-redux'; // Probably not useful
import { TabNavigator, StackNavigator } from 'react-navigation'; // Navigation components
// NEED TO USE REACT NAVIGTION 



  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    margin: 10,
  },
  save: {
    marginVertical: 9
  },
  image: {
    width: 200,
    height: 200
  },
  registerContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical: 16,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "black",
    fontSize: 16
  }
});

export default class LoginScreen extends Component {  

// Remove the navifation header on the login screen
  static navigationOptions = {
    header: null
  };

  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  };


  // Use constructor to store email and password. 
    constructor(){
      super();
      this.state = {isLoggedIn : false, email :"", password : ""};
     }


  // Sending for login to "loginUser" function
  onButtonPress = async () => { // The "async" serve for the await function


    console.log('Login button pressed');
      // const { email, password } = this.props;
      // this.props.loginUser({ email, password });
      try {
        //const email = "testtest@gmail.com"
        //const password = "testtest"
        console.log(this.state.email)
        console.log(this.state.password)
        let user = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password); // Should be "user = await fire..."
        console.log(user)
        console.log('User successfully logged');
        this.state.isLoggedIn = true
        // loginUserSuccess(dispatch, user);
      }
      catch (error) {
        console.log(error);
        let err_message = error.message;
        // loginUserFail(dispatch, err_message);
      }
  }


  // Visual container and text 
  render() {


    
    return (
      
      <View style={styles.container}>


        <Image
          style={styles.image}
          source={require('../assets/logo.png')}
        />
        <RkTextInput // Login field
          rkType='rounded'
          autoCorrect={false}
          style={styles.loginField}
          placeholder='Email'
          value={this.props.email}
          returnKeyType="next"
          onChangeText={(email) => this.setState({email : email})}
        />
        <RkTextInput // Password field
          rkType='rounded'
          placeholder='Password'
          style={styles.loginField}
          secureTextEntry={true}
          value={this.props.password}
          onChangeText={(password) => this.setState({password : password})}
          blurOnSubmit
          returnKeyType="send"
          onSubmitEditing={() => this.onButtonPress()}
        />
        <RkButton // Login button 
              rkType='rounded'
              onPress={() => { this.onButtonPress(); }}
              rkType='large'
              style={styles.save}>
              LOGIN
        </RkButton> 
        <Text // Reset password
              onPress={() => this.onNavPress('reset_scr')}
              rkType='large'
              style={styles.save}>
              RESET PASSWORD
        </Text>
        <TouchableOpacity // Register button
          onPress={() => this.onNavPress('registerinfo_scr')}
          style={styles.registerContainer}
          >
          <Text style={styles.registerText}>
            Don't have an account? Register!
          </Text>
        </TouchableOpacity>



      </View>
      


      
      
    );
  }
}

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);
