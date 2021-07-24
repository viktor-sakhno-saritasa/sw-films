import { fetchCollections } from '../firebase/firestore';
import { HandlersType } from '../interfaces';
import { FilmService } from '../services/film.service';
import { UserService } from '../services/user.service';
import { redirectMainPage, submit } from '../utils/utils';
import EditView from '../views/edit-view';


/**
 * Function for execute edit page logic.
 */
export function executeEdit(): void {
  const view = new EditView();
  const userService = new UserService();
  const filmService = new FilmService();

  const user = userService.getUser();

  const handlers: HandlersType = {
    logoutHandler(): void {
      userService.deleteUserFromLocalStorage();
      filmService.deleteFilmFromLocalStorage();
      redirectMainPage();
    },
    submitHandler(event: Event, action: string): void {
      submit(event, action, filmService);
    },
  };

  const film = filmService.getEditableFilmFromLocalStorage();

  if (user.name && film) {
    view.initialRender(user, handlers);

    const collectionData = filmService.getCollectionDataFromLocalStorage();
    const isEmptyCollection = collectionData === null;


    if (isEmptyCollection) {
      const collections = ['people', 'planets', 'species', 'starships', 'vehicles'];

      fetchCollections(collections).then(data => {
        filmService.addCollectionDataToLocalStorage(data);
        view.render(filmService.getCollectionDataFromLocalStorage() as Object[], handlers, film);
      });

    } else {
      view.render(filmService.getCollectionDataFromLocalStorage() as Object[], handlers, film);
    }
  } else {
    redirectMainPage();
  }
}


