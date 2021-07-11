import MainView from './views/main-view';
import LoginView from './views/login-view';
import FilmView from './views/film-view';
import View from './views/view';
import { fetchCollections, fetchFilms, fetchFilmWithRelated } from './firebase/firestore';
import { FilmDto } from './models/film-dto';
import { UserService } from './services/user.service';
import { FilmService } from './services/film.service';
import { redirectMainPage } from './utils/utils';
import { PageUrls } from './enums';
import NotFoundView from './views/404-view';
import { UserDto } from './models/user-dto';
import AddView from './views/add-view';

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
  '/add.html': () => new AddView(),
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
  addSubmitHandler(event: Event): void {
    event.preventDefault();
    const target = event.target as Element;
    const charSelect = target.querySelector('#characters') as HTMLSelectElement;
    const charSelected = [...charSelect.selectedOptions].map(option => Number(option.value));
    console.log(charSelected);
    console.log(event);
  }
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

  if (user.name && film) {
    view.initialRender();

    fetchFilmWithRelated(film.episodeId).then(currentFilm => {
      view.render(user, handlers.logoutHandler, currentFilm[0]!);
    });

  } else {
    redirectMainPage();
  }
}

if (view instanceof NotFoundView) {
  view.render();
}

if (view instanceof AddView) {
  const user = userService.getUser();

  if (user.name) {
    view.initialRender(userService.getUser(), handlers.logoutHandler);

    const collectionData = filmService.getCollectionDataFromLocalStorage();
    const isEmptyCollection = collectionData === null;

    if (isEmptyCollection) {
      const collections = ['people', 'planets', 'species', 'starships', 'transport', 'vehicles'];
      fetchCollections(collections).then(data => {
        filmService.addCollectionDataToLocalStorage(data);
        view.addRender(filmService.getCollectionDataFromLocalStorage() as Object[], handlers.addSubmitHandler);
        console.log('ch', data);
      });
    } else {
      view.addRender(filmService.getCollectionDataFromLocalStorage() as Object[], handlers.addSubmitHandler);
    }

    console.log(filmService.normalizeCollectionData());

  } else {
    redirectMainPage();
  }
}

