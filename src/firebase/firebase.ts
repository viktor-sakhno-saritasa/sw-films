import firebase from 'firebase';
import firebaseConfig from './firebase-config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();

export { firebaseApp, firestore };
