import {
  getFilmFromLocalStorage,
  getUserFromLocalStorage, logout,
  openStartPage,
} from '../../utils/utils.js';
import {LOGIN_PAGE_URL} from '../../utils/consts.js';
import FilmView from './film.view.js';

const handlers = {
  logoutHandler: () => {
    logout();
    window.location.assign(LOGIN_PAGE_URL);
  },
};

const filmView = new FilmView(handlers);

const user = getUserFromLocalStorage();
const film = getFilmFromLocalStorage();

if (user && film) {
  filmView.render(user, film);
} else {
  openStartPage();
}
