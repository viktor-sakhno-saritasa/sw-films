import { PageUrls } from '../enums';
import { deleteFilm, fetchFilms } from '../firebase/firestore';
import { HandlersType } from '../interfaces';
import { FilmDto } from '../models/film-dto';
import { FilmService } from '../services/film.service';
import { UserService } from '../services/user.service';
import { redirectMainPage } from '../utils/utils';
import MainView from '../views/main-view';

/**
 * Function for execute index page logic.
 */
export function executeIndex(): void {
  const view = new MainView();
  const userService = new UserService();
  const filmService = new FilmService();

  const handlers: HandlersType = {
    logoutHandler(): void {
      userService.deleteUserFromLocalStorage();
      filmService.deleteFilmFromLocalStorage();
      redirectMainPage();
    },
    detailsHandler(film: FilmDto): void {
      filmService.addFilmToLocalStorage(film);
      window.location.assign(PageUrls.Film);
    },
    addFilmHandler(): void {
      window.location.assign(PageUrls.Add);
    },
    editHandler(film: FilmDto): void {
      filmService.addEditableFilmToLocalStorage(film);
      window.location.assign(PageUrls.Edit);
    },
    deleteHandler(film: FilmDto): void {
      // eslint-disable-next-line no-alert
      const confirmation = window.confirm('Do you really want to delete the film?');
      if (confirmation) {
        deleteFilm(film.docId).then(() => {
          window.location.assign(PageUrls.Main);
        });
      }
    },
  };

  if (filmService.getFilmFromLocalStorage() || filmService.getEditableFilmFromLocalStorage()) {
    filmService.deleteFilmFromLocalStorage();
    filmService.deleteEditableFilmFromLocalStorage();
  }

  view.initialRender(userService.getUser(), handlers);


  fetchFilms().then(snapshot => {
    const films = snapshot as FilmDto[];
    films.forEach(film => filmService.add(film));
    filmService.addAllFilmsToLocalStorage(films);

    view.render(userService.getUser(), filmService.films, handlers);
  });
}
