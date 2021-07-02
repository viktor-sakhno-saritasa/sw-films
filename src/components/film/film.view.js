import createFooter from '../footer/footer.js';
import {MAIN_PAGE_URL} from '../../utils/consts.js';
import createHeader from '../header/header.js';

/**
 * Class for render Film Page
 */
export default class FilmView {
  constructor(handlers) {
    this.app = document.querySelector('#app');
    this.handlers = handlers;
  }

  /**
   * Render one film page
   * @param user
   * @param film
   */
  render(user, film) {
    this.app.append(createHeader(user, this.handlers.logoutHandler));
    this.app.insertAdjacentHTML('beforeend', this.createFilmPage(film));
    this.app.append(createFooter());
  }

  /**
   * Collects a wrapper consisting
   * of ar components of the film page
   * @param film
   * @return {string}
   */
  createFilmPage(film) {
    return `
    <main class="films">
      <div class="wrapper">
      ${this.createCard(film)}
      <a class="button back-link" href=${MAIN_PAGE_URL}>Go to the main page</a>
      </div>
    </main>
    `;
  }

  /**
   * Wraps the Film entity into a card for render.
   * @param film
   * @return {string}
   */
  createCard(film) {
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
        <thead>
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