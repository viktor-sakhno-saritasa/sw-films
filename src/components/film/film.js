import {
  getFilmFromLocalStorage,
  getUserFromLocalStorage, logout,
  openStartPage,
} from '../../utils/utils.js';
import FilmView from './film.view.js';

const handlers = {
  logoutHandler: logout,
};

const filmView = new FilmView(handlers);

const user = getUserFromLocalStorage();
const film = getFilmFromLocalStorage();

if (user && film) {
  filmView.render(user, film);
} else {
  openStartPage();
}
