import {fb} from '../../firebase/firebase.js';
import {getUserFromLocalStorage, sortFilms} from '../../core/utils.js';
import {createFilmsList, createHeaderHTML, createMainPage} from '../../core/dom.js';
import {LogOut} from '../../core/auth.js';
import {getFilms} from '../../firebase/firestoreCrud.js';
import Pagination from '../../core/Pagination.js';

const app = document.querySelector('#app');

const user = getUserFromLocalStorage();
let sortBtn;
let searchField;
let ascendingSort = true;

const header = createHeaderHTML(user);
app.append(header);

const loader = document.createElement('div');
loader.classList.add('loader-wrapper');
loader.insertAdjacentHTML('beforeend', '<div class="lds-hourglass"></div>');
app.append(loader);

getFilms().then(films => {
  let { mainPage, filmsList } = createMainPage({ user, films });
  app.append(mainPage);
  loader.remove();

  addPaginationToList(filmsList);

  sortBtn = document.querySelector('.button-sort');
  sortBtn.addEventListener('click', () => {
    const ul = createFilmsList(sort(films));
    filmsList.replaceWith(ul);
    filmsList = ul;
    addPaginationToList(ul);
  });

  searchField = document.querySelector('.films__search-input');
  searchField.addEventListener('input', event => {
    const searched = films.filter(film => {
      return film.fields.title.startsWith(event.target.value);
    });
    const ul = createFilmsList(searched);
    filmsList.replaceWith(ul);
    filmsList = ul;
    addPaginationToList(ul);
  });
});

if (user) {
  const logoutBtn = document.querySelector('#logout-btn');
  logoutBtn.addEventListener('click', LogOut);
}

function addPaginationToList(list) {
  const domElements = {
    items: document.querySelectorAll('.film__item'),
    prevButton: document.querySelector('#button_prev'),
    nextButton: document.querySelector('#button_next'),
    list: list,
    clickPageNumber: document.getElementsByClassName('clickPageNumber'),
    pageNumber: document.getElementById('page_number'),
    // currentPage = 1;
  };
  const pagination = new Pagination(domElements, 2);
  pagination.init();
}

function sort(films) {
  const sortedFilms = sortFilms(films, ascendingSort);
  ascendingSort = !ascendingSort;
  return sortedFilms;
}