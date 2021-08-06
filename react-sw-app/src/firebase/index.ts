import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import config from './firebase.config';

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
