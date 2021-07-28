import { fetchFilmWithRelated } from '../firebase/firestore';
import { HandlersType } from '../interfaces';
import { FilmDto } from '../models/film-dto';
import { FilmService } from '../services/film.service';
import { UserService } from '../services/user.service';
import { redirectMainPage } from '../utils/utils';
import FilmView from '../views/film-view';

/**
 * Function for execute film page logic.
 */
export function executeFilm(): void {
  const userService = new UserService();
  const filmService = new FilmService();
  const view = new FilmView();

  const handlers: HandlersType = {
    logoutHandler(): void {
      userService.deleteUserFromLocalStorage();
      filmService.deleteFilmFromLocalStorage();
      redirectMainPage();
    },
  };

  view.initialRender(userService.getUser(), handlers);

  const user = userService.getUser();
  const film = filmService.getFilmFromLocalStorage();

  if (user.name && film) {
    fetchFilmWithRelated(film.episodeId)
      .then(result => {
        const modifiedFilm = result[0] as FilmDto;
        view.render(modifiedFilm);
      });

  } else {
    redirectMainPage();
  }
}
