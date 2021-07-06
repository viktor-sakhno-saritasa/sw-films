import firebase from 'firebase';
import { addUserToLocalStorage, redirectMainPage } from './utils';

/**
 * Google-firebase authorization method and displayName
 * from response after that info adds to localStorage.
 */
export function signInWithGoogle(): void {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(googleProvider)
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
