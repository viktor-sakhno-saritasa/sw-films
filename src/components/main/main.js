import {fb} from '../../firebase/firebase.js';
import {FirestoreFilmService} from '../../firebase/FirestoreFilmService.js';
import {deleteUserFromLocalStorage, getUserFromLocalStorage, sortFilms} from '../../utils/utils.js';
import {drawHeader, createMainPage, createFilmsList} from './main.dom.js';
import Pagination from '../../core/Pagination.js';

const app = document.querySelector('#app');
const user = getUserFromLocalStorage();
let orderByAscending = false;

drawHeader(app, user);

const loader = document.createElement('div');
loader.classList.add('loader-wrapper');
loader.insertAdjacentHTML('beforeend', '<div class="lds-hourglass"></div>');
app.append(loader);

FirestoreFilmService.getFilms().then(films => {
  loader.remove();

  let {mainPage, filmsList} = createMainPage(user, films);
  app.append(mainPage);

  addPaginationToList(filmsList);

  const sortButton = document.querySelector('.button-sort');
  sortButton.addEventListener('click', () => {
    const sortedList = createFilmsList(sort(films));
    filmsList.replaceWith(sortedList);
    filmsList = sortedList;
    addPaginationToList(sortedList);
  });

  const searchField = document.querySelector('.films__search-input');
  searchField.addEventListener('input', event => {
    const searched = films.filter(film => {
      return film.title.includes(event.target.value);
    });

    /*TODO
    // view when 0 results
    // REFACTOR! REFACTOR! REFACTOR!
    */
    const ul = createFilmsList(searched);
    filmsList.replaceWith(ul);
    filmsList = ul;
    addPaginationToList(ul);
  });

});

if (user) {
  const logout = document.querySelector('#logout-btn');
  logout.addEventListener('click', deleteUserFromLocalStorage);
}

function sort(films) {
  orderByAscending = !orderByAscending;
  return sortFilms(films, orderByAscending);
}

//
// Const app = document.querySelector('#app');
//
// Const user = getUserFromLocalStorage();
// Let sortBtn;
// Let searchField;
// Let ascendingSort = true;
//
// Const header = createHeaderHTML(user);
// App.append(header);
//
// Const loader = document.createElement('div');
// Loader.classList.add('loader-wrapper');
// Loader.insertAdjacentHTML('beforeend', '<div class="lds-hourglass"></div>');
// App.append(loader);
//
// FirestoreFilmService.getFilms().then(films => {
//   Let { mainPage, filmsList } = createMainPage({ user, films });
//   App.append(mainPage);
//   Loader.remove();
//
//   AddPaginationToList(filmsList);
//
//   SortBtn = document.querySelector('.button-sort');
//   SortBtn.addEventListener('click', () => {
//     Const ul = createFilmsList(sort(films));
//     FilmsList.replaceWith(ul);
//     FilmsList = ul;
//     AddPaginationToList(ul);
//   });
//
//   SearchField = document.querySelector('.films__search-input');
//   SearchField.addEventListener('input', event => {
//     Const searched = films.filter(film => {
//       Return film.fields.title.startsWith(event.target.value);
//     });
//     Const ul = createFilmsList(searched);
//     FilmsList.replaceWith(ul);
//     FilmsList = ul;
//     AddPaginationToList(ul);
//   });
// });
//
// If (user) {
//   Const logoutBtn = document.querySelector('#logout-btn');
//   LogoutBtn.addEventListener('click', LogOut);
// }
//
// /**
//  *
//  */
function addPaginationToList(list) {
  const domElements = {
    items: document.querySelectorAll('.film__item'),
    prevButton: document.querySelector('#button_prev'),
    nextButton: document.querySelector('#button_next'),
    list: list,
    clickPageNumber: document.getElementsByClassName('clickPageNumber'),
    pageNumber: document.getElementById('page_number'),
    // CurrentPage = 1;
  };
  const pagination = new Pagination(domElements, 2);
  pagination.init();
}