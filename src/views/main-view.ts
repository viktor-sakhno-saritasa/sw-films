
import { FilmsList } from '../components/FilmsList';
import createHeader from '../components/header';
import addPagination from '../components/pagination';
import { IconUrls } from '../enums';
import { FilmDto } from '../models/film-dto';
import { UserDto } from '../models/user-dto';
import { sortFilms } from '../utils/utils';

import View from './view';

/**
 * View for index page render.
 */
class MainView extends View {

  /**
   * Created loader for next remove from DOM when films will be loaded.
   */
  private loader!: HTMLDivElement;

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

  constructor() {
    super();
    this.orderByAscending = false;
  }

  /**
   * Renders those elements that do not need to wait for the loading of films.
   * @param user Current user of application.
   * @param logoutHandler Event handler for logout button.
   */
  public initialRender(user: UserDto, logoutHandler: Function): void {
    this.root.append(createHeader(user, logoutHandler));
    this.loader = this.createLoader();
    this.root.append(this.loader);
  }

  /**
   * Main function in class, that render full page.
   * @param user Current user of application.
   * @param films List of films of application.
   * @param detailsHandler Event handler for "More details" button.
   */
  public render(user: UserDto, detailsHandler: Function, films: FilmDto[]): void {
    this.loader.remove();

    this.createMainPage(user, films, detailsHandler);
    this.filmsList = this.getElement('.films-list') as HTMLUListElement;

    addPagination(this.filmsList);

    const sortButton = this.getElement('.toolbar-sort');
    sortButton.addEventListener('click', () => this.sort(user, films, detailsHandler));

    const searchField = this.getElement('.toolbar-search');
    searchField.addEventListener('input', event => {
      this.search(user, films, event, detailsHandler);
    });
  }

  /**
   * Create loader for adding in the DOM tree while films is not loaded.
   * @returns Loader element.
   */
  private createLoader(): HTMLDivElement {
    const loader = this.createElement('div', 'loader-wrapper') as HTMLDivElement;
    loader.insertAdjacentHTML('beforeend', '<div class="lds-hourglass"></div>');
    return loader;
  }

  /**
   * Searches for a substring in the name of films and draws them,
   * if there is no substring, the last found ones will be drawn.
   * @param user Current user of application.
   * @param films List of films of application.
   * @param event Event for search input.
   * @param detailsHandler Event handler for "More details" button.
   */
  private search(user: UserDto, films: FilmDto[], event: Event, detailsHandler: Function): void {
    const founded = films.filter(film => {
        const target = event.target as HTMLInputElement;
        return film.title.toLowerCase().includes(target.value.trim().toLowerCase());
      });

    const hasItems = founded.length !== 0;

    if (hasItems) {
      const ul = FilmsList(user, founded, detailsHandler);
      this.filmsList.replaceWith(ul);
      this.filmsList = ul;
      addPagination(ul);
    }
  }

  /**
   * Sorts the list of films and replace ul node in the DOM.
   * @param user Current user of application.
   * @param films List of films of application.
   * @param detailsHandler Event handler for "More details" button.
   */
  private sort(user: UserDto, films: FilmDto[], detailsHandler: Function): void {
    this.orderByAscending = !this.orderByAscending;
    const sortedList = FilmsList(user, sortFilms(films, this.orderByAscending), detailsHandler);

    this.filmsList.replaceWith(sortedList);
    this.filmsList = sortedList;
    addPagination(sortedList);
  }

  /**
   * Collects a wrapper consisting of ar components of the main page.
   * @param user Current user of application.
   * @param films List of films of application.
   * @param detailsHandler Event handler for "More details" button.
   */
  private createMainPage(user: UserDto, films: FilmDto[], detailsHandler: Function): void {
    const filmsContent = this.createElement('main', 'films');
    const wrapper = this.createElement('div', 'wrapper');

    filmsContent.append(wrapper);

    wrapper.insertAdjacentHTML('beforeend', this.createToolBarTemplate());

    const filmsList = FilmsList(user, films, detailsHandler);
    filmsList.classList.add('films-list');

    wrapper.append(filmsList);
    wrapper.insertAdjacentHTML('beforeend', this.getPaginationTemplate());

    this.root.append(filmsContent);
  }

  /**
   * Creating toolbar with search field and sort button.
   * @returns HTML template for ToolBar.
   */
  private createToolBarTemplate(): string {
    return `
      <div class="toolbar">
        <input class="toolbar-search" type="search" placeholder="Search film by name...">
        <button type="button" class="button toolbar-sort">
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
