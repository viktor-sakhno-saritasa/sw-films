import {firebaseApp} from '../../firebase/firebase.js';
import {openStartPage} from '../../utils/utils.js';
import {signInWithGoogle} from '../../utils/auth.js';

export default class LoginView {
  constructor() {
    this.app = document.querySelector('#app');
  }

  render(user) {
    const loginPageHTML = this._createLoginPage(user);
    this.app.insertAdjacentHTML('beforeend', loginPageHTML);
  }

  initListeners(user) {
    const centralButton = user
      ? document.querySelector('#back-link')
      : document.querySelector('#google-auth');

    const listenerForCentralButton = centralButton.classList.contains('button--link')
      ? openStartPage
      : signInWithGoogle;

    centralButton.addEventListener('click', listenerForCentralButton);
  }

  /**
   * Collect a pieces of html and
   * return it depending on user is existing
   * @param user
   * @returns {string} header html
   */
  _createLoginPage(user) {
    const innerContent = user
      ?
      `
    <a href="../main1/main.html" id="back-link" class="button button--auth button--link">
      <img src="https://img.icons8.com/clouds/100/000000/checkmark--v1.png" width="50" height="50" alt="authorized">
      <span class="button__text">Hi, ${user.name}. Go back!</span>
    </a>
    `
      :
      `
    <button id="google-auth" class="button button--auth">
      <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" width="50" height="50" alt="Google">
      <span class="button__text">Sign in</span>
    </button> 
    `
    ;

    return `
    <main class="login">
        <div class="wrapper">${innerContent}</div>
    </main>
  `;
  }
}