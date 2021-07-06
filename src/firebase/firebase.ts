import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebase-config';

const Firebase = firebase.initializeApp(firebaseConfig);

export const Providers = {
  google: new firebase.auth.GoogleAuthProvider(),
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default Firebase;