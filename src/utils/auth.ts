import firebase from 'firebase/app';

import { auth, Providers } from '../firebase/firebase';

import { redirectMainPage } from './utils';

/**
 * Google-firebase authorization method and displayName
 * from response after that info adds to localStorage.
 * @param signInHandler Function calls when user is authorized.
 */
export function signInWithGoogle(signInHandler: Function): void {
  auth
    .signInWithPopup(Providers.google)
    .then(result => {
      const credential = result.credential as firebase.auth.OAuthCredential;
      const { user } = result;

      if (credential && credential.idToken && user && user.displayName) {
        signInHandler({
          token: credential.idToken,
          name: user.displayName,
        });
      }

      redirectMainPage();
    })
    .catch(error => console.error(error));
}
