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

export { firebase };
