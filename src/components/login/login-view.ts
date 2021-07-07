import { userLocalStorageType } from './../../user-type';
import { PageUrls, IconUrls } from './../../enums';
import { redirectMainPage } from '../../utils/utils';
import { signInWithGoogle } from '../../utils/auth';

/**
 * Class for render Login Page.
 */
export default class LoginView {
  private readonly app: HTMLElement;

  /**
   * Initialize root element for the page.
   */
  constructor() {
    this.app = document.querySelector('#app')!;
  }

  /**
   * Render full page.
   * @param user - The object saved in LocalStorage containing two keys: token and name.
   */
  public render(user: userLocalStorageType): void {
    const loginPageHTML = this.createLoginPage(user);
    this.app.insertAdjacentHTML('beforeend', loginPageHTML);
    this.initListeners(user);
  }

  /**
   * Defines function for central button in the login page.
   * @param user The object saved in LocalStorage containing two keys: token and name.
   */
  private initListeners(user: userLocalStorageType): void {
    const centralButton = user
      ? document.querySelector('.button-start')
      : document.querySelector('.button-auth');

    const listenerForCentralButton = centralButton!.classList.contains('button-start')
      ? redirectMainPage
      : signInWithGoogle;

    centralButton!.addEventListener('click', listenerForCentralButton);
  }

  /**
   * Collect a pieces of html and.
   * return it depending on user is existing.
   * @param user - The object saved in LocalStorage containing two keys: token and name.
   * @return Inner HTML for insert in the root element of the page.
   */
  private createLoginPage(user: userLocalStorageType): string {
    const loggedTemplate = () => {
      return `
        <a href=${PageUrls.Main} class="button button-login button-start">
          <img src=${IconUrls.Authorized} class="login-icon" alt="authorized">
          <span class="button__text">Hi, ${user!.name}. Go back!</span>
        </a>
      `;
    };

    const notLoggedTemplate = () => {
      return `
        <button class="button button-login button-auth">
          <img src=${IconUrls.Google} class="login-icon" alt="Google">
          <span class="login-text">Sign in</span>
        </button>
      `;
    };

    const innerContent = user ? loggedTemplate() : notLoggedTemplate();

    return `
      <main class="login">
          <div class="wrapper login-wrapper">${innerContent}</div>
      </main>
    `;
  }
}
