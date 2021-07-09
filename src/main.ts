import MainView from './views/main-view';
import LoginView from './views/login-view';
import FilmView from './views/film-view';
import View from './views/view';
import { fetchFilms, fetchFilmWithRelated } from './firebase/firestore';
import { FilmDto } from './models/film-dto';
import { UserService } from './services/user.service';
import { FilmService } from './services/film.service';
import { redirectMainPage } from './utils/utils';
import { PageUrls } from './enums';
import NotFoundView from './views/404-view';
import { UserDto } from './models/user-dto';

/**
 * Get view from routes depending current window.location.pathname.
 * @param routes Routes where each url has its own view.
 * @returns View depending url.
 */
function getView(routes: Record<string, Function>): View {
  const { pathname } = window.location;

  if (pathname in route && typeof routes[pathname] === 'function') {
    const view = routes[pathname] as Function;
    return view();
  }

  const notFoundView = routes['/404.html'] as Function;
  return notFoundView();
}

const route: Record<string, Function> = {
  '/index.html': () => new MainView(),
  '/login.html': () => new LoginView(),
  '/film.html': () => new FilmView(),
  '/404.html': () => new NotFoundView(),
};

const handlers = {
  logoutHandler(): void {
    filmService.deleteFilmFromLocalStorage();
    userService.deleteUserFromLocalStorage();
    redirectMainPage();
  },
  detailsHandler(film: FilmDto): void {
    filmService.addFilmToLocalStorage(film);
    window.location.assign(PageUrls.Film);
  },
  signInHandler(user: UserDto): void {
    userService.addUserToLocalStorage(user);
  },
};

const view: View = getView(route);
const filmService: FilmService = new FilmService();
const userService: UserService = new UserService();

/** Strategies for execute. */
if (view instanceof MainView) {
  view.initialRender(userService.getUser(), handlers.logoutHandler);

  fetchFilms().then(snapshot => {
    const films = snapshot as FilmDto[];
    films.forEach(film => filmService.add(film));

    view.render(userService.getUser(), handlers.detailsHandler, filmService.films);
  });
}

if (view instanceof LoginView) {
  view.render(userService.getUser(), handlers.signInHandler);
}

if (view instanceof FilmView) {
  const user = userService.getUser();
  const film = filmService.getFilmFromLocalStorage();

  if (user && film) {
    view.initialRender();

    fetchFilmWithRelated(film.episodeId).then(currentFilm => {
      view.render(user, handlers.logoutHandler, currentFilm[0]!);
    });

    // view.render(user, handlers.logoutHandler, currentFilm);
  } else {
    redirectMainPage();
  }
}

if (view instanceof NotFoundView) {
  view.render();
}


