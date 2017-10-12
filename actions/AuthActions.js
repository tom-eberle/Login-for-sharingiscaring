import firebase from 'firebase';

export const loginUser = ({ email, password }) => {

  return async (dispatch) => {

    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'checking'
    });
    dispatch({ type: LOGIN_USER });
    try {
      let user = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('user logged successfully');
      loginUserSuccess(dispatch, user);
    }
    catch (error) {
      console.log(error);
      let err_message = error.message;
      loginUserFail(dispatch, err_message);
    }


  };
};

export const logoutUser = () => {

  return async (dispatch) => {
      dispatch({
        type: LOGIN_STATUS_CHANGED,
        payload: 'checking'
      });
      try {
        await firebase.auth().signOut();
      } catch (error) {
        console.log(error);
        dispatch({
          type: LOGIN_STATUS_CHANGED,
          payload: 'loggedin'
        });
      }
  };

};

export const signupUser = ({ email, password, phone, firstname, lastname  }) => {
  return async (dispatch) => {

    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'checking'
    });
    dispatch({ type: SIGNUP_USER });
    var displayName = firstname + ' ' + lastname;
    var phoneNumber = '+1'+ phone;
    console.log(email);
    console.log(password);
    console.log(displayName);
    console.log(phoneNumber);

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
      loginUserSuccess(dispatch, user);
    }
    catch (error) {
      console.log(error);
      loginUserFail(dispatch);
    }

  };
};

export const authStateChanged = () => {
  return ( dispatch ) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({
            type: LOGIN_STATUS_CHANGED,
            payload: 'loggedin'
          });
        } else {
         dispatch({
            type: LOGIN_STATUS_CHANGED,
            payload: 'notloggedin'
          });
        }
      });
  }

}



const loginUserFail = (dispatch, err_message) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: err_message
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

};
