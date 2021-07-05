import { addFilmToLocalStorage, getUserFromLocalStorage, logout } from '../../utils/utils.js';
import { getFilms } from '../../firebase/firestore.js';
import { FILM_PAGE_URL } from '../../utils/consts.js';
import MainView from './main.view.js';

const handlers = {
  logoutHandler: logout,
  detailsHandler: (film) => {
    addFilmToLocalStorage(film);
    window.location.assign(FILM_PAGE_URL);
  },
};

const mainView = new MainView(handlers);
const user = getUserFromLocalStorage();

mainView.initialRender(user);

getFilms().then(films => {
  mainView.render(user, films);
});