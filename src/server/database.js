import { firebase } from './firebase';

const database = firebase.database();

const getUserSettings = userId =>
  database
    .ref(`/users/${userId}`)
    .once('value')
    .then(snapshot => snapshot.val());

const setUserSettings = (userId, values) =>
  database.ref(`/users/${userId}`).set(values);

export { getUserSettings, setUserSettings };
