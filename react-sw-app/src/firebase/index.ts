import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import config from './firebase.config';

export const firebaseApp = firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
