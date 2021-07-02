import {deleteFilmFromLocalStorage, deleteUserFromLocalStorage} from '../../utils/utils.js';

export default class FilmView {
  constructor() {
    this.app = document.querySelector('#app');
  }

  render(user, film) {

    this._drawHeader(this.app, user);

    if (user) {
      const logout = document.querySelector('#logout-btn');
      logout.addEventListener('click', () => {
        deleteUserFromLocalStorage();
        deleteFilmFromLocalStorage();
        window.location.assign('../login/login.html');
      });
    }

    this.app.insertAdjacentHTML('beforeend', this._createFilmPage(film));
    this.app.insertAdjacentHTML('beforeend', this._createFooter());
  }

  /**
   * Gets the html of header and append to the root
   * Draws different depending on user is existing or not
   * @param app
   * @param user
   */
  _drawHeader(app, user) {
    app.append(this._createHeader(user));
  }

  /**
   * Collect a pieces of html and
   * return it depending on user is existing
   * @param user
   */
  _createHeader(user) {
    const header = document.createElement('header');
    header.classList.add('main-page__header', 'header');

    const innerContent = user
      ?
      `
      <div class="header__user">
        <img class="header__user-icon" src="https://img.icons8.com/doodle/48/000000/user.png"/>
        <span class="header__username">${user.name}</span>
      </div>
      <a href="../main/main.html" id="logout-btn" class="button button--sign-in">Log out</a>
    `
      :
      `
      <a href="../login/login.html" class="button button--sign-in">Sign in</a>
    `;

    header.innerHTML = `
    <h1 class="header__title">SW Films</h1>
    <ul class="header__list">
      <li class="header__item">${innerContent}</li>
    </ul>
  `;

    return header;
  }


  _createFilmPage(film) {
    return `
    <main class="films">
      <div class="films__wrapper">
      ${this._createCard(film)}
      <a class="button back-link" href="../main/main.html">Go to the main page</a>
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

  /**
   * Creating footer element for the main1 and primary pages.
   * @returns {string}
   */
  _createFooter() {
    return `
    <footer class="contacts">
      <a class="contacts__link" href="https://www.interesnee.ru/">INTERESNEE.RU</a>
      <span class="contacts__copy">&copy; Viktor Sakhno. 2021 JS Camp</span>
    </footer>
  `;
  }

}