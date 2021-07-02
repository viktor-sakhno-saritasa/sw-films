import firebaseConfig from './firebase-config.js';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();

export {
  firebaseApp,
  firestore,
};