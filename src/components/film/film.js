import {
  deleteFilmFromLocalStorage,
  deleteUserFromLocalStorage,
  getFilmFromLocalStorage,
  getUserFromLocalStorage,
  logout,
  openStartPage,
} from '../../utils/utils.js';
import {LOGIN_PAGE_URL} from '../../utils/consts.js';
import FilmView from './film.view.js';

const handlers = {
  logoutHandler: () => {
    deleteUserFromLocalStorage();
    deleteFilmFromLocalStorage();
    window.location.assign(LOGIN_PAGE_URL);
  },
};

const filmView = new FilmView(handlers);

const user = getUserFromLocalStorage();
const film = getFilmFromLocalStorage();

if (user && film) {
  filmView.render(user, film, logout);
} else {
  openStartPage();
}
