import Pagination from '../Pagination/Pagination.js';
import {sortFilms} from '../../utils/utils.js';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import {FilmsList} from '../FilmsList/FilmsList.js';

export default class MainView {
  constructor(handlers) {
    this.app = document.querySelector('#app');
    this.orderByAscending = false;
    this.handlers = handlers;
  }

  initialRender(user) {
    this.app.append(Header(user, this.handlers.logoutHandler));

    this.loader = this._createLoader();
    this.app.append(this.loader);
  }

  render(user, films) {
    this.loader.remove();

    const filmsList = this._createMainPage(user, films);

    this.filmsList = filmsList;
    Pagination(filmsList);

    this.app.append(Footer());


    const sortButton = document.querySelector('.button-sort');
    sortButton.addEventListener('click', () => {
      const sortedList = FilmsList(user, this._sort(films), this.handlers.detailsHandler);
      this.filmsList.replaceWith(sortedList);
      this.filmsList = sortedList;
      Pagination(sortedList);
    });

    const searchField = document.querySelector('.films__search-input');
    searchField.addEventListener('input', event => {
      console.log(event.target.value);
      const searched = films.filter(film => {
        return film.title.toLowerCase().includes(event.target.value.trim().toLowerCase());
      });

      const hasItems = searched.length !== 0;

      if (hasItems) {
        const ul = FilmsList(user, searched, this.handlers.detailsHandler);
        this.filmsList.replaceWith(ul);
        this.filmsList = ul;
        Pagination(ul);
      } else {
        this.filmsList.innerHTML = '<h1>Nothing found</h1>';
      }
    });
  }

  _sort(films) {
    this.orderByAscending = !this.orderByAscending;
    return sortFilms(films, this.orderByAscending);
  }


  _createLoader() {
    const loader = document.createElement('div');
    loader.classList.add('loader-wrapper');
    loader.insertAdjacentHTML('beforeend', '<div class="lds-hourglass"></div>');
    return loader;
  }


  _createMainPage(user, films) {
    const filmsContent = document.createElement('main');
    filmsContent.classList.add('films');
    const filmsWrapper = document.createElement('div');
    filmsWrapper.classList.add('films__wrapper');

    filmsContent.append(filmsWrapper);

    filmsWrapper.insertAdjacentHTML('afterbegin', this._createToolsBar());

    const filmsList = FilmsList(user, films, this.handlers.detailsHandler);
    filmsList.classList.add('films__list');
    filmsWrapper.append(filmsList);

    filmsWrapper.insertAdjacentHTML('beforeend', this._createPagination());

    this.app.append(filmsContent);

    return filmsList;
  }


  /**
   * Creating toolsbar with search field and sort button.
   * @returns {string}
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
   * @returns {string}
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
}