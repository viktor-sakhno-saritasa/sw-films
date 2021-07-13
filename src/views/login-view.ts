import { IconUrls, PageUrls } from '../enums';
import { HandlersType } from '../interfaces';
import { UserDto } from '../models/user-dto';
import { signInWithGoogle } from '../utils/auth';
import { redirectMainPage } from '../utils/utils';

import View from './view';

/**
 * View for Login page render.
 */
class LoginView extends View {
  /**
   * Render full page.
   * @param user Current user of application.
   * @param handlers Handlers for login page.
   */
  public render(user: UserDto, handlers: HandlersType): void {
    this.root.insertAdjacentHTML('beforeend', this.createLoginTemplate(user));
    this.initLocalListeners(user, handlers.signInHandler as Function);
  }

  /**
   * Initialize listeners for interactive with user.
   * @param user Current user of application.
   * @param signInHandler Function calls when user is authorized.
   */
  private initLocalListeners(user: UserDto, signInHandler: Function): void {
    const centralButton = user.name ? this.getElement('.button-start') : this.getElement('.button-auth');
    const listenerForCentralButton = centralButton?.classList.contains('button-start') ?
      redirectMainPage :
      () => signInWithGoogle(signInHandler);

    centralButton?.addEventListener('click', listenerForCentralButton);
  }

  /**
   * Creates html template for login page depending user authorized or not.
   * @param user Current user of application.
   * @returns Template for login page creating.
   */
  private createLoginTemplate(user: UserDto): string {

    /**
     * Create login page template for authorized user.
     * @returns HtmlTemplate for authorized user.
     */
    const loggedTemplate = (): string => `
      <a href=${PageUrls.Main} class="button button-login button-start">
        <img src=${IconUrls.Authorized} class="login-icon" alt="authorized">
        <span class="button__text">Hi, ${user.name}. Go back!</span>
      </a>
    `;

    /**
     * Create login page template for unauthorized user.
     * @returns HtmlTemplate for unauthorized user.
     */
    const notLoggedTemplate = (): string => `
      <button type="button" class="button button-login button-auth">
        <img src=${IconUrls.Google} class="login-icon" alt="Google">
        <span class="login-text">Sign in</span>
      </button>
    `;

    const innerContent = user.name ? loggedTemplate() : notLoggedTemplate();

    return `
      <main class="login">
          <div class="wrapper login-wrapper">${innerContent}</div>
      </main>
    `;
  }
}

export default LoginView;
