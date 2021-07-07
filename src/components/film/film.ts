import { Film, filmLocalStorageType } from '../../film-type';
import { User, userLocalStorageType } from '../../user-type';
import { getFilmFromLocalStorage, getUserFromLocalStorage, logout, redirectMainPage } from '../../utils/utils';

import FilmView from './film-view';

const handlers = {
  logoutHandler: logout,
};

const filmView: FilmView = new FilmView(handlers);

const user: userLocalStorageType = getUserFromLocalStorage();
const film: filmLocalStorageType = getFilmFromLocalStorage();

if (user && film) {
  filmView.render(user as User, film as Film);
} else {
  redirectMainPage();
}
