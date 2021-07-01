import {fb} from '../../firebase/firebase.js';
import {signInWithGoogle} from '../../utils/auth.js';
import {getUserFromLocalStorage} from '../../core/utils.js';
import {openStartPage} from '../../utils/utils.js';
import {drawLoginPage} from './login.dom.js';

/**
 * Run login page
 */
function run() {
  const app = document.querySelector('#app');
  const user = getUserFromLocalStorage();

  drawLoginPage(app, user);

  const centralButton = user
    ? document.querySelector('#back-link')
    : document.querySelector('#google-auth');

  const listenerForCentralButton = centralButton.classList.contains('button--link')
    ? openStartPage
    : signInWithGoogle;

  centralButton.addEventListener('click', listenerForCentralButton);
}

run();