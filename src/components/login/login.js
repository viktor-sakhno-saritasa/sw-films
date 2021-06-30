import {fb} from '../../firebase/firebase.js';
import {signInWithGoogle} from '../../core/auth.js';
import {getUserFromLocalStorage} from '../../core/utils.js';
import {createLoginPage} from '../../core/dom.js';

const app = document.querySelector('#app');

const user = getUserFromLocalStorage();
app.insertAdjacentHTML('beforeend', createLoginPage(getUserFromLocalStorage()));

const mainButton = user
  ? document.querySelector('#back-link')
  : document.querySelector('#google-auth');

const listenerFn = mainButton.classList.contains('button--link')
  ? GoMainPage
  : signInWithGoogle;

mainButton.addEventListener('click', listenerFn);

function GoMainPage() {
  window.location.assign('../main/main.html');
}