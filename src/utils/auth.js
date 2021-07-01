import {MAIN_PAGE} from './consts.js';
import {addUserToLocalStorage} from './utils.js';

/**
 * Google-firebase authorization method
 * Saves idToken and displayName from response.
 * After that info adds to localStorage.
 */
export function signInWithGoogle() {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(googleProvider)
    .then(result => {
      const {credential, user} = result;

      addUserToLocalStorage({
        token: credential.idToken,
        name: user.displayName,
      });

      window.location.assign(MAIN_PAGE);
    })
    .catch(error => {
      console.log(error);
    });
}