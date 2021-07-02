import addPagination from '../pagination/pagination.js';
import {sortFilms} from '../../utils/utils.js';
import Footer from '../footer/footer.js';
import {FilmsList} from '../FilmsList/FilmsList.js';
import createHeader from '../header/header.js';
import {SORT_ICON_URL} from '../../utils/consts.js';

/**
 * Class for render Main Page
 */
export default class MainView {
  constructor(handlers) {
    this.app = document.querySelector('#app');
    this.orderByAscending = false;
    this.handlers = handlers;
  }

  /**
   * Renders those elements that do not need
   * to wait for the loading of films.
   * @param user
   */
  initialRender(user) {
    this.app.append(createHeader(user, this.handlers.logoutHandler));

    this.loader = this.createLoader();
    this.app.append(this.loader);
  }

  /**
   * Main function in class, that render full page
   * @param user
   * @param films
   */
  render(user, films) {
    this.loader.remove();

    this.createMainPage(user, films);
    this.filmsList = document.querySelector('.films-list');

    addPagination(this.filmsList);

    this.app.append(Footer());

    const sortButton = document.querySelector('.toolbar-sort');
    sortButton.addEventListener('click', () => this.sort(user, films));

    const searchField = document.querySelector('.toolbar-search');
    searchField.addEventListener('input', event => {
      this.search(user, films, event);
    });
  }

  /**
   * Searches for a substring in the name of films and draws them,
   * if there is no substring, the last found ones will be drawn
   * @param user
   * @param films
   * @param event
   */
  search(user, films, event) {
    const founded = films.filter(film => {
      return film.title.toLowerCase().includes(event.target.value.trim().toLowerCase());
    });

    const hasItems = founded.length !== 0;

    if (hasItems) {
      const ul = FilmsList(user, founded, this.handlers.detailsHandler);
      this.filmsList.replaceWith(ul);
      this.filmsList = ul;
      addPagination(ul);
    }
  }

  /**
   * Sorts the list of films and replace ul node in the DOM.
   * @param user
   * @param films
   */
  sort(user, films) {
    this.orderByAscending = !this.orderByAscending;
    const sortedList = FilmsList(
      user, sortFilms(films, this.orderByAscending), this.handlers.detailsHandler
    );

    this.filmsList.replaceWith(sortedList);
    this.filmsList = sortedList;
    addPagination(sortedList);
  }

  /**
   * Collects a wrapper consisting
   * of ar components of the main page
   * @param user
   * @param films
   * @return {*}
   */
  createMainPage(user, films) {
    const filmsContent = document.createElement('main');
    filmsContent.classList.add('films');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    filmsContent.append(wrapper);

    wrapper.insertAdjacentHTML('beforeend', this.createToolBar());

    const filmsList = FilmsList(user, films, this.handlers.detailsHandler);
    filmsList.classList.add('films-list');
    wrapper.append(filmsList);

    wrapper.insertAdjacentHTML('beforeend', this.getPaginationHTML());

    this.app.append(filmsContent);
  }

  /**
   * Creating toolbar with search field and sort button.
   * @returns {string}
   */
  createToolBar() {
    return `
      <div class="toolbar">
        <input class="toolbar-search" type="search" placeholder="Search film by name...">
        <button class="button toolbar-sort">
          <img src=${SORT_ICON_URL} height="30" width="30" alt="sort"/>
        </button>
      </div>
    `;
  }

  /**
   * Get html of the pagination block.
   * @returns {string}
   */
  getPaginationHTML() {
    return `
    <section class="pagination">
      <button class="pagination-button pagination-button-prev"><</button>
      <ul class="pagination-pages-list"></ul>
      <button class="pagination-button pagination-button-next">></button>
    </section>
  `;
  }

  /**
   * Creates loader for append in the root while promises is pending.
   * @return {HTMLDivElement}
   */
  createLoader() {
    const loader = document.createElement('div');
    loader.classList.add('loader-wrapper');
    loader.insertAdjacentHTML('beforeend', '<div class="lds-hourglass"></div>');
    return loader;
  }
}