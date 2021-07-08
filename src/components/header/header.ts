import { IconUrls } from '../../enums';
import { userLocalStorageType } from '../../user-type';
import { redirectLoginPage } from '../../utils/utils';

/**
 * Creates Header Component
 * And set event handler on logout button.
 * @param user - The object saved in LocalStorage containing two keys: token and name.
 * @param logoutHandler - Event handler for Logout button.
 * @returns Header component.
 */
export default function createHeader(user: userLocalStorageType, logoutHandler: Function): HTMLElement {
  const header = document.createElement('header');
  header.classList.add('header');

  const logoutTemplate = () => `
    <div class="header-user">
      <img src=${IconUrls.User} alt=${user!.name}>
      <span class="header-username">${user!.name}</span>
    </div>
    <button type="button" id="sign-btn" class="button button-auth">Log out</button>
    `;

  const loginTemplate = () => '<button id="sign-btn" class="button button-auth">Sign in</button>';

  const innerContent = user ? logoutTemplate() : loginTemplate();

  header.innerHTML = `
      <h1 class="header-title">SW Films</h1>
      <nav class="header-navigation">${innerContent}</nav>
    `;

  const signButton = header.querySelector('#sign-btn');
  signButton!.addEventListener('click', () => {
    if (user) {
      logoutHandler();
    } else {
      redirectLoginPage();
    }
  });

  return header;
}
