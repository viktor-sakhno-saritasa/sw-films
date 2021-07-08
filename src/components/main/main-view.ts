import addPagination from '../pagination/pagination';
import { sortFilms } from '../../utils/utils';
import { FilmsList } from '../FilmsList/FilmsList';
import createHeader from '../header/header';
import { userLocalStorageType } from '../../user-type';
import { Film } from '../../film-type';

import { IconUrls } from '../../enums';

/**
 * Class for render Main Page.
 */
export default class MainView {
  private readonly app: HTMLElement;

  private readonly handlers: Record<string, Function>;

  private orderByAscending: boolean;

  private filmsList!: HTMLUListElement;

  private loader!: HTMLDivElement;


  /**
   * Initialize root element and event handlers for the page.
   * @param handlers - Object with functions - event handlers for different components.
   */
  constructor(handlers: Record<string, Function>) {
    this.app = document.querySelector('#app')!;
    this.orderByAscending = false;
    this.handlers = handlers;
  }

  /**
   * Renders those elements that do not need
   * to wait for the loading of films.
   * @param user - The object saved in LocalStorage containing two keys: token and name.
   */
  public initialRender(user: userLocalStorageType): void {
    this.app.append(createHeader(user, this.handlers['logoutHandler']!));

    this.loader = this.createLoader();
    this.app.append(this.loader);
  }

  /**
   * Main function in class, that render full page.
   * @param user - The object saved in LocalStorage containing two keys: token and name.
   * @param films - Array of film's objects.
   */
  public render(user: userLocalStorageType, films: Film[]): void {
    this.loader.remove();

    this.createMainPage(user, films);
    this.filmsList = document.querySelector('.films-list')!;

    addPagination(this.filmsList);

    const sortButton = document.querySelector('.toolbar-sort')!;
    sortButton.addEventListener('click', () => this.sort(user, films));

    const searchField = document.querySelector('.toolbar-search')!;
    searchField.addEventListener('input', event => {
      this.search(user, films, event);
    });
  }

  /**
   * Searches for a substring in the name of films and draws them,
   * if there is no substring, the last found ones will be drawn.
   * @param user - The object saved in LocalStorage containing two keys: token and name.
   * @param films - Array of film's objects.
   * @param event - Event for search input.
   */
  private search(user: userLocalStorageType, films: Film[], event: Event): void {
    const founded = films.filter(film => {
      const target = event.target as HTMLInputElement;
      return film.title.toLowerCase().includes(target.value.trim().toLowerCase());
    });

    const hasItems = founded.length !== 0;

    if (hasItems) {
      const ul = FilmsList(user, founded, this.handlers['detailsHandler']!);
      this.filmsList.replaceWith(ul);
      this.filmsList = ul;
      addPagination(ul);
    }
  }

  /**
   * Sorts the list of films and replace ul node in the DOM.
   * @param user - The object saved in LocalStorage containing two keys: token and name.
   * @param films - Array of film's objects.
   */
  private sort(user: userLocalStorageType, films: Film[]): void {
    this.orderByAscending = !this.orderByAscending;
    const sortedList = FilmsList(
      user, sortFilms(films, this.orderByAscending), this.handlers['detailsHandler']!,
    );

    this.filmsList.replaceWith(sortedList);
    this.filmsList = sortedList;
    addPagination(sortedList);
  }

  /**
   * Collects a wrapper consisting
   * of ar components of the main page.
   * @param user - The object saved in LocalStorage containing two keys: token and name.
   * @param films - Array of film's objects.
   */
  private createMainPage(user: userLocalStorageType, films: Film[]): void {
    const filmsContent = document.createElement('main');
    filmsContent.classList.add('films');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    filmsContent.append(wrapper);

    wrapper.insertAdjacentHTML('beforeend', this.createToolBar());

    const filmsList = FilmsList(user, films, this.handlers['detailsHandler']!);
    filmsList.classList.add('films-list');
    wrapper.append(filmsList);

    wrapper.insertAdjacentHTML('beforeend', this.getPaginationHTML());

    this.app.append(filmsContent);
  }

  /**
   * Creating toolbar with search field and sort button.
   * @returns HTML layout for ToolBar.
   */
  private createToolBar(): string {
    return `
      <div class="toolbar">
        <input class="toolbar-search" type="search" placeholder="Search film by name...">
        <button class="button toolbar-sort">
          <img src=${IconUrls.Sorting} class="toolbar-icon" alt="sort"/>
        </button>
      </div>
    `;
  }

  /**
   * Get html of the pagination block.
   * @returns HTML layout for Pagination.
   */
  private getPaginationHTML(): string {
    return `
    <section class="pagination">
      <button class="pagination-button pagination-button-prev">&lt;</button>
      <ul class="pagination-pages-list"></ul>
      <button class="pagination-button pagination-button-next">&gt;</button>
    </section>
  `;
  }

  /**
   * Creates loader for append in the root while promises is pending.
   * @returns Loader Component.
   */
  private createLoader(): HTMLDivElement {
    const loader = document.createElement('div');
    loader.classList.add('loader-wrapper');
    loader.insertAdjacentHTML('beforeend', '<div class="lds-hourglass"></div>');
    return loader;
  }
}
