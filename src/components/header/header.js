import {USER_ICON_URL} from '../../utils/consts.js';
import {openLoginPage} from '../../utils/utils.js';

/**
 * Creates Header Component
 * And set event handler on logout button
 * @param {object} user - The object saved in LocalStorage containing two keys: token and name
 * @param {function} logoutHandler - Event handler for Logout button
 * @return {HTMLElement} Header component
 */
export default function createHeader(user, logoutHandler) {

  const header = document.createElement('header');
  header.classList.add('header');

  const innerContent = user
    ?
    `
      <div class="header-user">
        <img src=${USER_ICON_URL} alt=${user.name}>
        <span class="header-username">${user.name}</span>
      </div>
      <button id="sign-btn" class="button button-auth">Log out</button>
    `
    :
    `
      <button id="sign-btn" class="button button-auth">Sign in</button>
    `;

  header.innerHTML = `
      <h1 class="header-title">SW Films</h1>
      <nav class="header-navigation">${innerContent}</nav>
    `;

  const signButton = header.querySelector('#sign-btn');
  signButton.addEventListener('click', () => {
    if (user) {
      logoutHandler();
    } else {
      openLoginPage();
    }
  });
    
  return header;
}