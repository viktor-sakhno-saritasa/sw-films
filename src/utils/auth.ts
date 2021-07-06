import firebase from 'firebase/app';
import { auth, Providers } from '../firebase/firebase';
import { addUserToLocalStorage, redirectMainPage } from './utils';

/**
 * Google-firebase authorization method and displayName
 * from response after that info adds to localStorage.
 */
export function signInWithGoogle(): void {

  auth
    .signInWithPopup(Providers.google)
    .then((result) => {
      const credential = result.credential as firebase.auth.OAuthCredential;
      const user = result.user;

      addUserToLocalStorage({
        token: credential.idToken!,
        name: user!.displayName!,
      });

      redirectMainPage();
    })
    .catch((error) => console.error(error));
}
