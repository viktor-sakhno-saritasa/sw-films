import { PageUrls } from '../enums';

import View from './view';

/**
 * Class for render 404 Page.
 */
class NotFoundView extends View {
  constructor() {
    super();
  }

  /**
   * Render 404 error page.
   */
  public render(): void {
    this.root.insertAdjacentHTML('afterbegin', this.createNotFoundTemplate());
  }

  /**
   * Create template for 404 render.
   * @returns NotFoundTemplate for 404 page.
   */
  private createNotFoundTemplate(): string {
    return `
    <div class="notfound">
      <div id="clouds">
        <div class="cloud x1"></div>
        <div class="cloud x1_5"></div>
        <div class="cloud x2"></div>
        <div class="cloud x3"></div>
        <div class="cloud x4"></div>
        <div class="cloud x5"></div>
      </div>
    </div>
    <div class="c">
      <div class='_404'>404</div>
      <hr>
      <div class='_1'>THE PAGE</div>
      <div class='_2'>WAS NOT FOUND</div>
      <a class='btn' href=${PageUrls.Main}>BACK TO MARS</a>
    </div>
    `;
  }
}

export default NotFoundView;
