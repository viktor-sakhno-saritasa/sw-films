import {addUserToLocalStorage, deleteUserFromLocalStorage} from './utils.js';

const auth = firebase.auth();

export function signInWithGoogle() {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(googleProvider)
    .then(result => {
      const { credential, user } = result;

      addUserToLocalStorage({
        token: credential.idToken,
        username: user.displayName,
      });

      window.location.assign('../main/main.html');
    })
    .catch(error => {
      console.log(error);
    });
};

export function LogOut() {
  deleteUserFromLocalStorage();
}
