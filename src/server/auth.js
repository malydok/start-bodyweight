import { firebase } from './firebase';

const auth = firebase.auth();

const authRegister = ({ email, password }) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch(error => ({ error }));

const authLogin = ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password).catch(error => ({ error }));

const authSignOut = () => auth.signOut();

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

export {
  authRegister,
  authLogin,
  authSignOut,
  onAuthChange
};
