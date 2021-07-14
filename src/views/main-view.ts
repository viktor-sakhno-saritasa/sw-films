
import { FilmsList } from '../components/FilmsList';
import createHeader from '../components/header';
import addPagination from '../components/pagination';
import { IconUrls } from '../enums';
import { HandlersType } from '../interfaces';
import { FilmDto } from '../models/film-dto';
import { UserDto } from '../models/user-dto';
import { sortFilms } from '../utils/utils';

import View from './view';

/**
 * View for index page render.
 */
class MainView extends View {
  /**
   * Ul with films for that not lose link for replace element when sort or update list.
   */
  private filmsList!: HTMLUListElement;

  /**
   * Flag for sorting mode.
   * True, ascending.
   * False, descending.
   */
  private orderByAscending: boolean;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
    super();
    this.orderByAscending = false;
  }

  /**
   * Renders those elements that do not need to wait for the loading of films.
   * @param user Current user of application.
   * @param handlers Event handler for header.
   */
  public initialRender(user: UserDto, handlers: HandlersType): void {
    this.root.append(createHeader(user, handlers));
    this.loader = this.createLoader();
    this.root.append(this.loader);
  }

  /**
   * Main function in class, that render full page.
   * @param user Current user of application.
   * @param films List of films of application.
   * @param handlers Event handlers for main page.
   */
  public render(user: UserDto, films: FilmDto[], handlers: HandlersType): void {
    this.loader.remove();

    const addFilmHandler = handlers.addFilmHandler as Function;

    this.createMainPage(user, films, handlers);
    this.filmsList = this.getElement('.films-list') as HTMLUListElement;

    addPagination(this.filmsList);

    const sortButton = this.getElement('.toolbar-sort');
    sortButton.addEventListener('click', () => this.sort(user, films, handlers));

    const searchField = this.getElement('.toolbar-search');
    searchField.addEventListener('input', event => {
      this.search(user, films, event, handlers);
    });

    const addButton = this.getElement('.toolbar-add');
    addButton.addEventListener('click', () => addFilmHandler());
  }

  /**
   * Searches for a substring in the name of films and draws them,
   * if there is no substring, the last found ones will be drawn.
   * @param user Current user of application.
   * @param films List of films of application.
   * @param event Event for search input.
   * @param handlers Event handlers element.
   */
  private search(user: UserDto, films: FilmDto[], event: Event, handlers: HandlersType): void {
    const founded = films.filter(film => {
        const target = event.target as HTMLInputElement;
        return film.title.toLowerCase().includes(target.value.trim().toLowerCase());
      });

    const hasItems = founded.length !== 0;

    if (hasItems) {
      const ul = FilmsList(user, founded, handlers);
      this.filmsList.replaceWith(ul);
      this.filmsList = ul;
      addPagination(ul);
    }
  }

  /**
   * Sorts the list of films and replace ul node in the DOM.
   * @param user Current user of application.
   * @param films List of films of application.
   * @param handlers Event handlers for elements.
   */
  private sort(user: UserDto, films: FilmDto[], handlers: HandlersType): void {
    this.orderByAscending = !this.orderByAscending;
    const sortedList = FilmsList(user, sortFilms(films, this.orderByAscending), handlers);

    this.filmsList.replaceWith(sortedList);
    this.filmsList = sortedList;
    addPagination(sortedList);
  }

  /**
   * Collects a wrapper consisting of ar components of the main page.
   * @param user Current user of application.
   * @param films List of films of application.
   * @param handlers Event handlers for elements.
   */
  private createMainPage(user: UserDto, films: FilmDto[], handlers: HandlersType): void {
    const filmsContent = this.createElement('main', 'films');
    const wrapper = this.createElement('div', 'container films-container');

    filmsContent.append(wrapper);

    wrapper.insertAdjacentHTML('beforeend', this.createToolBarTemplate(user));

    const filmsListWrapper = this.createElement('div', 'films-list-wrapper');
    wrapper.append(filmsListWrapper);

    const filmsList = FilmsList(user, films, handlers);
    filmsList.classList.add('films-list');

    filmsListWrapper.append(filmsList);
    filmsListWrapper.insertAdjacentHTML('beforeend', this.getPaginationTemplate());

    this.root.append(filmsContent);
  }

  /**
   * Creating toolbar with search field and sort button.
   * @param user Current user.
   * @returns HTML template for ToolBar.
   */
  private createToolBarTemplate(user: UserDto): string {

    const addButtonTemplate = user.name ?
      `<button type="button" class="button toolbar-button toolbar-add">
        <img src=${IconUrls.AddFilm} class="toolbar-icon" alt="add-film"/>
      </button>
      ` : '';

    return `
      <div class="toolbar">
        ${addButtonTemplate}
        <input class="toolbar-search" type="search" placeholder="Search film by name...">
        <button type="button" class="button toolbar-button toolbar-sort">
          <img src=${IconUrls.Sorting} class="toolbar-icon" alt="sort"/>
        </button>
      </div>
    `;
  }

  /**
   * Get html of the pagination block.
   * @returns HTML template for Pagination.
   */
  private getPaginationTemplate(): string {
    return `
        <section class="pagination">
          <button type="button" class="pagination-button pagination-button-prev">&lt;</button>
          <ul class="pagination-pages-list"></ul>
          <button type="button" class="pagination-button pagination-button-next">&gt;</button>
        </section>
    `;
  }
}

export default MainView;
