import { executeFilm } from './pages/film';
import { executeIndex } from './pages/index';
import { executeLogin } from './pages/login';

/**
 * Run an app.
 */
function run(): void {
  const route: Record<string, Function> = {
    '/index.html': executeIndex,
    '/login.html': executeLogin,
    '/film.html': executeFilm,
  };

  const { pathname } = window.location;

  if (pathname in route && typeof route[pathname] === 'function') {
    const execute = route[pathname] as Function;
    execute();
  } else {
    throw new Error('Pathname is not in route object.');
  }
}

run();

// import { addNewFilm, editFilm } from './firebase/firestore';
// import { FilmDto } from './models/film-dto';
// import { UserService } from './services/user.service';
// import { FilmService } from './services/film.service';
// import { redirectMainPage } from './utils/utils';

// import { PageUrls } from './enums';

// import { Context } from './strategy/Context';
// import { MainRenderStrategy } from './strategy/MainRenderStrategy';
// import { FilmRenderStrategy } from './strategy/FilmRenderStrategy';
// import { LoginRenderStrategy } from './strategy/LoginRenderStrategy';
// import { FilmService } from './services/film.service';
// import { UserService } from './services/user.service';
// import { getView } from './utils/utils';


// const view: View = getView(route);
// const context: Context = new Context(new FilmService(), new UserService());

// if (view instanceof MainView) {
//   context.setStrategy(new MainRenderStrategy(view));
// }

// if (view instanceof FilmView) {
//   context.setStrategy(new FilmRenderStrategy(view));
// }

// if (view instanceof LoginView) {
//   context.setStrategy(new LoginRenderStrategy(view));
// }

// context.execute();

// const handlers = {
//   logoutHandler(): void {
//     filmService.deleteFilmFromLocalStorage();
//     userService.deleteUserFromLocalStorage();
//     redirectMainPage();
//   },
//   detailsHandler(film: FilmDto): void {
//     filmService.addFilmToLocalStorage(film);
//     window.location.assign(PageUrls.Film);
//   },
//   signInHandler(user: UserDto): void {
//     userService.addUserToLocalStorage(user);
//   },
//   addSubmitHandler(event: Event, action: string): void {
//     event.preventDefault();
//     const target = event.target as Element;
//     const charSelect = target.querySelector('#characters') as HTMLSelectElement;
//     const charSelected = [...charSelect.selectedOptions].map(option => Number(option.value));
//     const planetsSelect = target.querySelector('#planets') as HTMLSelectElement;
//     const planetsSelected = [...planetsSelect.selectedOptions].map(option => Number(option.value));
//     const speciesSelect = target.querySelector('#species') as HTMLSelectElement;
//     const speciesSelected = [...speciesSelect.selectedOptions].map(option => Number(option.value));
//     const starshipSelect = target.querySelector('#starships') as HTMLSelectElement;
//     const starshipSelected = [...starshipSelect.selectedOptions].map(option => Number(option.value));
//     const vehicleSelect = target.querySelector('#vehicles') as HTMLSelectElement;
//     const vehicleSelected = [...vehicleSelect.selectedOptions].map(option => Number(option.value));

//     const title = target.querySelector('#title') as HTMLInputElement;
//     const director = target.querySelector('#director') as HTMLInputElement;
//     const producer = target.querySelector('#producer') as HTMLInputElement;
//     const releaseDate = target.querySelector('#release-date') as HTMLInputElement;
//     const description = target.querySelector('#description') as HTMLTextAreaElement;

//     const d = releaseDate.value.trim();
//     const created = new Date();

//     const previous = filmService.getFilmFromLocalStorage() as FilmDto;

//     if (action === 'add') {
//       const nextId = filmService.getNextIdForFilm();
//       const film = {
//         fields: {
//           characters: charSelected,
//           planets: planetsSelected,
//           species: speciesSelected,
//           starships: starshipSelected,
//           vehicles: vehicleSelected,
//           title: title.value.trim(),
//           director: director.value.trim(),
//           producer: producer.value.trim(),
//           release_date: d,
//           opening_crawl: description.value.trim(),
//           created: created.toISOString(),
//           edited: created.toISOString(),
//           episode_id: nextId,
//         },
//         model: 'resources.film',
//         pk: nextId,
//       };

//       addNewFilm(film).then(() => {
//         redirectMainPage();
//       });
//     }

//     if (action === 'update') {
//       const film = {
//         fields: {
//           characters: charSelected,
//           planets: planetsSelected,
//           species: speciesSelected,
//           starships: starshipSelected,
//           vehicles: vehicleSelected,
//           title: title.value.trim(),
//           director: director.value.trim(),
//           producer: producer.value.trim(),
//           release_date: d,
//           opening_crawl: description.value.trim(),
//           created: previous.created,
//           edited: created.toISOString(),
//           episode_id: previous.episodeId,
//         },
//         model: 'resources.film',
//         pk: previous.episodeId,
//       };
//       editFilm(film, previous.docId).then(() => {
//         redirectMainPage();
//       });
//     }
//   },
// };


// const filmService: FilmService = new FilmService();
// const userService: UserService = new UserService();


/** Strategies for execute. */
// if (view instanceof MainView) {
//   view.initialRender(userService.getUser(), handlers.logoutHandler);

//   fetchFilms().then(snapshot => {
//     const films = snapshot as FilmDto[];
//     films.forEach(film => filmService.add(film));
//     filmService.addAllFilmsToLocalStorage(films);

//     view.render(userService.getUser(), handlers.detailsHandler, filmService.films);
//   });
// }

// if (view instanceof LoginView) {
//   view.render(userService.getUser(), handlers.signInHandler);
// }

// if (view instanceof FilmView) {
//   const user = userService.getUser();
//   const film = filmService.getFilmFromLocalStorage();

//   if (user.name && film) {
//     view.initialRender();

//     fetchFilmWithRelated(film.episodeId).then(currentFilm => {
//       view.render(user, handlers.logoutHandler, currentFilm[0]!);
//     });

//   } else {
//     redirectMainPage();
//   }
// }

// if (view instanceof NotFoundView) {
//   view.render();
// }

// if (view instanceof AddView) {
//   const user = userService.getUser();

//   if (user.name) {
//     view.initialRender(userService.getUser(), handlers.logoutHandler);

//     const collectionData = filmService.getCollectionDataFromLocalStorage();
//     const isEmptyCollection = collectionData === null;

//     if (isEmptyCollection) {
//       const collections = ['people', 'planets', 'species', 'starships', 'transport', 'vehicles'];
//       fetchCollections(collections).then(data => {
//         filmService.addCollectionDataToLocalStorage(data);
//         view.addRender(filmService.getCollectionDataFromLocalStorage() as Object[], handlers.addSubmitHandler);
//         console.log('ch', data);
//       });
//     } else {
//       view.addRender(filmService.getCollectionDataFromLocalStorage() as Object[], handlers.addSubmitHandler);
//     }
//   } else {
//     redirectMainPage();
//   }
// }

// if (view instanceof EditView) {
//   const user = userService.getUser();

//   if (user.name) {
//     view.initialRender(userService.getUser(), handlers.logoutHandler);

//     const collectionData = filmService.getCollectionDataFromLocalStorage();
//     const isEmptyCollection = collectionData === null;

//     const film = filmService.getFilmFromLocalStorage() as FilmDto;

//     if (isEmptyCollection) {
//       const collections = ['people', 'planets', 'species', 'starships', 'transport', 'vehicles'];
//       fetchCollections(collections).then(data => {
//         filmService.addCollectionDataToLocalStorage(data);
//         view.editRender(filmService.getCollectionDataFromLocalStorage() as Object[], handlers.addSubmitHandler, film);
//         console.log('ch', data);
//       });
//     } else {
//       view.editRender(filmService.getCollectionDataFromLocalStorage() as Object[], handlers.addSubmitHandler, film);
//     }
//   } else {
//     redirectMainPage();
//   }
// }
