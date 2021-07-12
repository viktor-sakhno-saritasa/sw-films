import { fetchCollections } from '../firebase/firestore';
import { HandlersType } from '../interfaces';
import { FilmService } from '../services/film.service';
import { UserService } from '../services/user.service';
import { redirectMainPage, submit } from '../utils/utils';
import AddView from '../views/add-view';

/**
 * Function for execute add page logic.
 */
export function executeAdd(): void {
  const view = new AddView();
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

  if (user.name) {
    view.initialRender(user, handlers);

    const collectionData = filmService.getCollectionDataFromLocalStorage();
    const isEmptyCollection = collectionData === null;

    if (isEmptyCollection) {
      const collections = ['people', 'planets', 'species', 'starships', 'vehicles'];

      fetchCollections(collections).then(data => {
        filmService.addCollectionDataToLocalStorage(data);
        view.render(filmService.getCollectionDataFromLocalStorage() as Object[], handlers);
      });

    } else {
      view.render(filmService.getCollectionDataFromLocalStorage() as Object[], handlers);
    }
  } else {
    redirectMainPage();
  }
}


