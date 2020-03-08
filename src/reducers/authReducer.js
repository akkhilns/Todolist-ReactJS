import Util from "./../Util";
import axios from 'axios';

const LOGIN_PROCESSING = 'LOGIN_PROCESSING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const SET_LOGGEDIN_USER_DATA = 'SET_LOGGEDIN_USER_DATA';

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginProcessing(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginFailed(null));

    callingLoginApi(email, password, data => {
      dispatch(setLoginProcessing(false));
      if (data.isLoggedIn == true) {
        dispatch(setLoginSuccess(true));
        dispatch(setLoggedInUserData(data.userData)); 
      } else {
        dispatch(setLoginFailed(true));
      }
    });
  }
}

function setLoginProcessing(isLoginProcessing) {
  return {
    type: LOGIN_PROCESSING,
    isLoginProcessing
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginFailed(isLoginFailed) {
  return {
    type: LOGIN_FAILED,
    isLoginFailed
  }
}

function setLoggedInUserData(loggedInUserData) {
  return {
    type: SET_LOGGEDIN_USER_DATA,
    loggedInUserData
  }
}

function callingLoginApi(email, password, callback) {
      var current = this;
      var url = new Util().getBaseUrl() + '/login';
      var postData = {};
      postData['username'] = email;
      postData['password'] = password;
      var userData = {};

      axios.post(url, postData)
      .then(function (response) {
          if(response.data.status == 'true'){
            userData['token'] = response.data.token;
            userData['first_name'] = response.data.first_name;
            callback({ isLoggedIn : true, userData:userData });
          }else{
            return callback({isLoggedIn : false, userData:userData});
          }
      })
      .catch(function (error) {
        return callback({isLoggedIn : false, userData:userData});
      })
      .finally(function () {
      });
}

export default function reducer(state = {
  isLoginProcessing: false,
  isLoginSuccess: false,
  isLoginFailed: false,
  loggedInUserData:[]
}, action) {
  switch (action.type) {
    case LOGIN_PROCESSING:
      return Object.assign({}, state, {
        isLoginProcessing: action.isLoginProcessing
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isLoginFailed: action.isLoginFailed
      });

    case SET_LOGGEDIN_USER_DATA:
      return Object.assign({}, state, {
        loggedInUserData: action.loggedInUserData
      });

    default:
      return state;
  }
}