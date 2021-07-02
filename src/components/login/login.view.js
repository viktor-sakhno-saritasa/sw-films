import {firebaseApp} from '../../firebase/firebase.js';
import {openStartPage} from '../../utils/utils.js';
import {signInWithGoogle} from '../../utils/auth.js';
import {DONE_ICON_URL, GOOGLE_ICON_URL, MAIN_PAGE_URL} from '../../utils/consts.js';

/**
 * Class for render Login Page
 */
export default class LoginView {
  constructor() {
    this.app = document.querySelector('#app');
  }

  /**
   * Render full page
   * @param user
   */
  render(user) {
    const loginPageHTML = this.createLoginPage(user);
    this.app.insertAdjacentHTML('beforeend', loginPageHTML);
  }

  /**
   * Defines function for central button in the login page.
   * @param user
   */
  initListeners(user) {
    const centralButton = user
      ? document.querySelector('.button-start')
      : document.querySelector('.button-auth');

    const listenerForCentralButton = centralButton.classList.contains('button-start')
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
  createLoginPage(user) {
    const innerContent = user
      ?
      `
        <a href=${MAIN_PAGE_URL} class="button button-login button-start">
          <img src=${DONE_ICON_URL} width="50" height="50" alt="authorized">
          <span class="button__text">Hi, ${user.name}. Go back!</span>
        </a>
      ` 
      : 
      `
        <button class="button button-login button-auth">
          <img src=${GOOGLE_ICON_URL} width="50" height="50" alt="Google">
          <span class="login-text">Sign in</span>
        </button> 
      `;

    return `
      <main class="login">
          <div class="wrapper">${innerContent}</div>
      </main>
    `;
  }
}