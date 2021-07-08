import { PageUrls } from '../../enums';
import { Film } from '../../film-type';
import { User } from '../../user-type';
import createHeader from '../header/header';

/**
 * Class for render Film Page.
 */
export default class FilmView {
  private readonly app: HTMLElement;

  /**
   * Initialize root element and event handlers for the page.
   * @param handlers - Object with functions - event handlers for different components.
   */
  constructor(private handlers: Record<string, Function>) {
    this.app = document.querySelector('#app')!;
  }

  /**
   * Render one film page.
   * @param user - The object saved in LocalStorage containing two keys: token and name.
   * @param film - Film object that saved in LocalStorage for opening.
   */
  public render(user: User, film: Film): void {
    this.app.append(createHeader(user, this.handlers['logoutHandler']!));
    this.app.insertAdjacentHTML('beforeend', this.createFilmPage(film));
  }

  /**
   * Collects a wrapper consisting
   * of ar components of the film page.
   * @param film - Film object that saved in LocalStorage for opening.
   * @returns Inner HTML for insert in the root element of the page.
   */
  private createFilmPage(film: Film): string {
    return `
    <main class="films">
      <div class="wrapper">
        ${this.createCardTemplate(film)}
        <a class="button back-link" href=${PageUrls.Main}>Go to the main page</a>
      </div>
    </main>
    `;
  }

  /**
   * Wraps the Film entity into a card for render.
   * @param film - Film object that saved in LocalStorage for opening.
   * @returns Inner HTML of film card.
   */
  private createCardTemplate(film: Film): string {
    return `
    <div class="card">
      <div class="card-content">
        <h2 class="card-name card-title">${film.title}</h2>
        <div class="card-description">
          <p>${film.description}</p>
        </div>
      </div>
      <div class="card-img film-img">${film.episodeId}</div>
      <table class="card-details">
        <tr class="card-item">
          <th class="card-title">Episode</th>
          <td class="card-info">${film.episodeId}</td>
        </tr>
        <tr class="card-item">
          <th class="card-title">Release Date</th>
          <td class="card-info">${film.releaseDate}</td>
        </tr>
        <tr class="card-item">
          <th class="card-title">Director</th>
          <td class="card-info">${film.director}</td>
        </tr>
        <tr class="card-item">
          <th class="card-title">Producer</th>
          <td class="card-info">${film.producer}</td>
        </tr>
      </table>
    </div>
    `;
  }
}
