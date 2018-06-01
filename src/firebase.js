import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDp27tiKuLQnC3o6ValBUdxhtq1z4nyHIM',
  authDomain: 'start-bodyweight.firebaseapp.com',
  databaseURL: 'https://start-bodyweight.firebaseio.com',
  projectId: 'start-bodyweight',
  storageBucket: 'start-bodyweight.appspot.com',
  messagingSenderId: '917856758898'
};
firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();

const authRegister = ({ email, password }) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch(error => ({ error }));

const authLogin = ({ email, password }) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(error => ({ error }));

const authSignOut = () =>
  auth.signOut()

const onAuthChange = callback => {
  auth.onAuthStateChanged(newUser => {
    callback(
      newUser && {
        email: newUser.email,
        uid: newUser.uid
      }
    );
  });
};

const getUserSettings = userId => 
  database
    .ref(`/users/${userId}`)
    .once('value')
    .then(snapshot => snapshot.val());

const setUserSettings = (userId, values) =>
  database.ref(`/users/${userId}`)
    .set(values);

export {
  authRegister,
  authLogin,
  authSignOut,
  onAuthChange,
  getUserSettings,
  setUserSettings
};
