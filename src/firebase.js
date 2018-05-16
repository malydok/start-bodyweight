import firebase from 'firebase/app';

import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/messaging';
// import 'firebase/functions';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: 'start-bodyweight.firebaseapp.com',
  databaseURL: 'https://start-bodyweight.firebaseio.com',
  projectId: 'start-bodyweight',
  storageBucket: 'start-bodyweight.appspot.com',
  messagingSenderId: '917856758898'
};
firebase.initializeApp(config);

export { firebase };
