import {getFilmFromLocalStorage, getUserFromLocalStorage, openStartPage} from '../../utils/utils.js';
import FilmView from './film.view.js';

const filmView = new FilmView();

const user = getUserFromLocalStorage();
const film = getFilmFromLocalStorage();

if (user && film) {
  filmView.render(user, film);
} else {
  openStartPage();
}
