import {LOGIN_PAGE_URL, MAIN_PAGE_URL, USER_ICON_URL} from '../../utils/consts.js';

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
        <img src=${USER_ICON_URL}>
        <span class="header-username">${user.name}</span>
      </div>
      <a href=${MAIN_PAGE_URL} id="logout-btn" class="button button-auth">Log out</a>
    `
    :
    `
      <a href=${LOGIN_PAGE_URL} class="button button-auth">Sign in</a>
    `;
    
  header.innerHTML = `
      <h1 class="header-title">SW Films</h1>
      <nav class="header-navigation">${innerContent}</nav>
    `;

  if (user) {
    const logoutButton = header.querySelector('#logout-btn');
    logoutButton.addEventListener('click', logoutHandler);
  }
    
  return header;
}