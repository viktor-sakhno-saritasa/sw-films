import {fb} from '../../firebase/firebase.js';
import {getUserFromLocalStorage, sortFilms} from '../../core/utils.js';
import {createFilmsList, createHeaderHTML, createMainPage} from '../../core/dom.js';
import {LogOut} from '../../core/auth.js';
import {getFilms} from '../../firebase/firestoreCrud.js';

const app = document.querySelector('#app');

const user = getUserFromLocalStorage();
let sortBtn;
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

  sortBtn = document.querySelector('.button-sort');
  sortBtn.addEventListener('click', () => {
    const ul = createFilmsList(sort(films));
    filmsList.replaceWith(ul);
    filmsList = ul;
  });
});

if (user) {
  const logoutBtn = document.querySelector('#logout-btn');
  logoutBtn.addEventListener('click', LogOut);
}


function sort(films) {
  const sortedFilms = sortFilms(films, ascendingSort);
  ascendingSort = !ascendingSort;
  return sortedFilms;
}