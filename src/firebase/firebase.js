import firebaseConfig from './firebase-config.js';

const fb = firebase.initializeApp(firebaseConfig);
const firestore = fb.firestore();

export {
  fb,
  firestore,
};