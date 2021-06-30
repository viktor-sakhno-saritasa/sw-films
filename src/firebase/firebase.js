import firebaseConfig from './firebase-config.js';

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();