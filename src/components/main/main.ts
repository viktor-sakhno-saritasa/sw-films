import { PageUrls } from '../../enums';
import { Film } from '../../film-type';
import { fetchFilms } from '../../firebase/firestore';
import { userLocalStorageType } from '../../user-type';
import { addFilmToLocalStorage, getUserFromLocalStorage, logout } from '../../utils/utils';

import MainView from './main-view';

const handlers: Record<string, Function> = {
  logoutHandler: logout,
  detailsHandler(film: Film) {
    addFilmToLocalStorage(film);
    window.location.assign(PageUrls.Film);
  },
};

const mainView: MainView = new MainView(handlers);
const user: userLocalStorageType = getUserFromLocalStorage();

mainView.initialRender(user);

fetchFilms().then(films => {
  mainView.render(user, films);
});
