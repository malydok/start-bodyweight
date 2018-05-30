import firebase from 'firebase/app';

import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/messaging';
// import 'firebase/functions';

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
let user;

const authRegister = ({ email, password }) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch(error => ({ error }));

const authLogin = ({ email, password }) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(error => ({ error }));


auth.onAuthStateChanged(newUser => {
  user = newUser;
  console.log(user);
});

const isAuthenticated = () => !!user;

export { authRegister, authLogin, isAuthenticated };
