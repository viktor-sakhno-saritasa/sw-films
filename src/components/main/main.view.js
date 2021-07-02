import {addFilmToLocalStorage, deleteFilmFromLocalStorage, deleteUserFromLocalStorage} from '../../utils/utils.js';
import Pagination from '../../utils/Pagination.js';
import {sortFilms} from '../../utils/utils.js';

export default class MainView {
  constructor() {
    this.app = document.querySelector('#app');
    this.orderByAscending = false;
  }

  initialRender(user) {
    this._drawHeader(this.app, user);

    if (user) {
      const logout = document.querySelector('#logout-btn');
      logout.addEventListener('click', () => {
        deleteUserFromLocalStorage();
        deleteFilmFromLocalStorage();
      });
    }

    this.loader = this._createLoader();
    this.app.append(this.loader);
  }


  render(user, films) {
    this.loader.remove();

    const {mainPage, filmsList} = this._createMainPage(user, films);
    this.mainPage = mainPage;
    this.filmsList = filmsList;

    this.app.append(this.mainPage);

    this._addPaginationToList(this.filmsList);

    const sortButton = document.querySelector('.button-sort');
    sortButton.addEventListener('click', () => {
      const sortedList = this._createFilmsList(user, this._sort(films));
      this.filmsList.replaceWith(sortedList);
      this.filmsList = sortedList;
      this._addPaginationToList(sortedList);
    });

    const searchField = document.querySelector('.films__search-input');
    searchField.addEventListener('input', event => {
      console.log(event.target.value);
      const searched = films.filter(film => {
        return film.title.toLowerCase().includes(event.target.value.trim().toLowerCase());
      });

      const hasItems = searched.length !== 0;

      if (hasItems) {
        const ul = this._createFilmsList(user, searched);
        this.filmsList.replaceWith(ul);
        this.filmsList = ul;
        this._addPaginationToList(ul);
      } else {
        this.filmsList.innerHTML = '<h1>Nothing found</h1>';
      }
    });
  }

  _sort(films) {
    this.orderByAscending = !this.orderByAscending;
    return sortFilms(films, this.orderByAscending);
  }

  _addPaginationToList(list) {
    const domElements = {
      items: document.querySelectorAll('.film__item'),
      prevButton: document.querySelector('#button_prev'),
      nextButton: document.querySelector('#button_next'),
      list: list,
      clickPageNumber: document.getElementsByClassName('clickPageNumber'),
      pageNumber: document.getElementById('page_number'),
    };

    const pagination = new Pagination(domElements, 2);
    pagination.init();
  }

  _createLoader() {
    const loader = document.createElement('div');
    loader.classList.add('loader-wrapper');
    loader.insertAdjacentHTML('beforeend', '<div class="lds-hourglass"></div>');
    return loader;
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

  _createMainPage(user, films) {
    const mainPage = document.createElement('div');
    mainPage.classList.add('main-page');

    const filmsContent = document.createElement('main');
    filmsContent.classList.add('films');
    const filmsWrapper = document.createElement('div');
    filmsWrapper.classList.add('films__wrapper');

    filmsContent.append(filmsWrapper);

    filmsWrapper.insertAdjacentHTML('afterbegin', this._createToolsBar());

    const filmsList = this._createFilmsList(user, films);
    filmsList.classList.add('films__list');
    filmsWrapper.append(filmsList);

    filmsWrapper.insertAdjacentHTML('beforeend', this._createPagination());

    mainPage.append(filmsContent);

    mainPage.insertAdjacentHTML('beforeend', this._createFooter());

    return {mainPage, filmsList};
  }

  _createFilmsList(user, films) {
    const ul = document.createElement('ul');
    ul.classList.add('films__list');

    films.forEach(film => {
      ul.append(this._createFilmItemHtml(user, film));
    });

    return ul;
  }
  /**
   * Creating footer element for the main1 and primary pages.
   * @return {string}
   */
  _createFooter() {
    return `
    <footer class="contacts">
      <a class="contacts__link" href="https://www.interesnee.ru/">INTERESNEE.RU</a>
      <span class="contacts__copy">&copy; Viktor Sakhno. 2021 JS Camp</span>
    </footer>
  `;
  }

  /**
   * Creating toolsbar with search field and sort button.
   * @return {string}
   */
  _createToolsBar() {
    return `
  <div class="films__operations">
    <input class="films__search-input" type="search" placeholder="Search film by name...">
    <div class="button-sort">
      <img src="https://img.icons8.com/color-glass/50/000000/sort.png" height="30" width="30" alt="SORT"/>
    </div>
  </div>
  `;
  }

  /**
   * Creating html with pagination block.
   * @return {string}
   */
  _createPagination() {
    return `
    <div class="pagination">
      <span id="button_prev" class="pagination__item pageButton outline-none"><</span>
      <span id="page_number" class="pagination__item pagination__numbers outline-none"></span>
      <span id="button_next" class="pagination__item pageButton outline-none">></span>
    </div>
  `;
  }

  _createFilmItemHtml(user, film) {
    const li = document.createElement('li');
    li.classList.add('film__item');

    li.innerHTML = `
      <div class="film__title">${film.title}</div>
      <div class="film__img">${film.episodeId}</div>
      <p class="film__description">${film.description}</p>
  `;

    if (user) {
      const button = document.createElement('button');
      button.classList.add('button', 'button--more');
      button.innerText = 'More details';

      button.addEventListener('click', () => {
        addFilmToLocalStorage(film);
        window.location.assign('../film/film.html');
      });

      li.append(button);
    }

    return li;
  }

}