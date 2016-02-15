import { SET_USER } from './action_types';

export function registerListeners() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.onAuth(function(authData) {
      if(authData) {
        console.log("Authenticated with uid:", authData.uid);
        const ref = firebase.child(`users/${authData.uid}`);
        ref.on('value', snapshot => {
          dispatch({
            type: SET_USER,
            user: snapshot.val()
          });
        });
      }else{
        console.log("Client unauthenticated.");
        const ref = firebase.child('users');
        ref.off();
        dispatch({
          type: SET_USER,
          user: {}
        });
      }
    });
  };
}

export function unregisterListeners() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('users');
    ref.off();
    dispatch({
      type: SET_USER,
      user: {}
    });
  };
}

// Notifications:
export function refreshNotifications( notifications ){
  return {
    type: 'NOTIFICATION_REFRESH',
    notification: notifications
  };
}

export function  notificationListener() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const userId = auth.id;
    firebase.child(`users/${userId}/notifications`).on('value', (snapshot) => {
      dispatch( refreshNotifications( snapshot.val() || { } ));
    });
  };
}

export function  notificationListenerKiller() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const userId = auth.id;
    firebase.child(`users/${userId}/notifications`).off();
  };
}
