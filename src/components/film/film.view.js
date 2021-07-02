import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import {MAIN_PAGE_URL} from '../../utils/consts.js';
import createHeader from '../header/header.js';

export default class FilmView {
  constructor(handlers) {
    this.app = document.querySelector('#app');
    this.handlers = handlers;
  }

  render(user, film) {
    this.app.append(createHeader(user, this.handlers.logoutHandler));
    this.app.insertAdjacentHTML('beforeend', this._createFilmPage(film));
    this.app.append(Footer());
  }

  _createFilmPage(film) {
    return `
    <main class="films">
      <div class="films__wrapper">
      ${this._createCard(film)}
      <a class="button back-link" href=${MAIN_PAGE_URL}>Go to the main page</a>
      </div>
    </main>
    `;
  }


  _createCard(film) {
    return `
    <div class="card">
      <div class="card__main-content">
        <h2 class="card__name film__title">${film.title}</h2>
        <div class="card__description">
          <p>${film.description}</p>
        </div>
      </div>
      <div class="card__img film__img">${film.episodeId}</div>
      <table class="card__details">
        <thead>
        <tr class="card__item">
          <th class="card__title">Episode</th>
          <td class="card__info">${film.episodeId}</td>
        </tr>
        <tr class="card__item">
          <th class="card__title">Release Date</th>
          <td class="card__info">${film.releaseDate}</td>
        </tr>
        <tr class="card__item">
          <th class="card__title">Director</th>
          <td class="card__info">${film.director}</td>
        </tr>
        <tr class="card__item">
          <th class="card__title">Producer</th>
          <td class="card__info">${film.producer}</td>
        </tr>
      </table>
    </div>
    `;
  }
}