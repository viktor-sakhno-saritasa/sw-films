import { PageUrls } from '../enums';
import { addNewFilm, editFilm } from '../firebase/firestore';
import { FilmDto } from '../models/film-dto';
import { FilmService } from '../services/film.service';

/**
 * Redirect to the main page with films.
 */
export function redirectMainPage(): void {
  window.location.assign(PageUrls.Main);
}

/**
 * Redirect to the login page.
 */
export function redirectLoginPage(): void {
  window.location.assign(PageUrls.Login);
}

/**
 * Creates new array and sorts films by episode.
 * @param films List of films for sorting.
 * @param orderByAscending True if ascending sort, else descending.
 * @returns New sorted list of films.
 */
export function sortFilms(films: FilmDto[], orderByAscending: boolean): FilmDto[] {
  const sortedFilms = [...films];

  const ascending = (a: FilmDto, b: FilmDto): number => a.episodeId - b.episodeId;
  const descending = (a: FilmDto, b: FilmDto): number => b.episodeId - a.episodeId;

  if (orderByAscending) {
    return sortedFilms.sort(ascending);
  }

  return sortedFilms.sort(descending);
}

/**
 * Get view from routes depending current window.location.pathname.
 * @param route Routes where each url has its own view.
 * @returns View depending url.
 */
export function getView(route: Record<string, Function>): Function {
  const { pathname } = window.location;

  if (pathname in route && typeof route[pathname] === 'function') {
    const view = route[pathname] as Function;
    return view();
  }

  const notFoundView = route['/404.html'] as Function;
  return notFoundView();
}

/**
 * Submit form for next steps.
 * @param event Form that need to submit.
 * @param action Add or Edit action type.
 * @param filmService FilmService for manage film data.
 */
export function submit(event: Event, action: string, filmService: FilmService): void {
  event.preventDefault();
  const target = event.target as Element;
  const charSelect = target.querySelector('#characters') as HTMLSelectElement;
  const charSelected = [...charSelect.selectedOptions].map(option => Number(option.value));
  const planetsSelect = target.querySelector('#planets') as HTMLSelectElement;
  const planetsSelected = [...planetsSelect.selectedOptions].map(option => Number(option.value));
  const speciesSelect = target.querySelector('#species') as HTMLSelectElement;
  const speciesSelected = [...speciesSelect.selectedOptions].map(option => Number(option.value));
  const starshipSelect = target.querySelector('#starships') as HTMLSelectElement;
  const starshipSelected = [...starshipSelect.selectedOptions].map(option => Number(option.value));
  const vehicleSelect = target.querySelector('#vehicles') as HTMLSelectElement;
  const vehicleSelected = [...vehicleSelect.selectedOptions].map(option => Number(option.value));

  const title = target.querySelector('#title') as HTMLInputElement;
  const director = target.querySelector('#director') as HTMLInputElement;
  const producer = target.querySelector('#producer') as HTMLInputElement;
  const releaseDate = target.querySelector('#release-date') as HTMLInputElement;
  const description = target.querySelector('#description') as HTMLTextAreaElement;

  const release = releaseDate.value.trim();
  const created = new Date();

  const previous = filmService.getEditableFilmFromLocalStorage() as FilmDto;
  const nextId = filmService.getNextIdForFilm();


  const film = {
    fields: {
      characters: charSelected,
      planets: planetsSelected,
      species: speciesSelected,
      starships: starshipSelected,
      vehicles: vehicleSelected,
      title: title.value.trim(),
      director: director.value.trim(),
      producer: producer.value.trim(),
      release_date: release,
      opening_crawl: description.value.trim(),
      created: created.toISOString(),
      edited: created.toISOString(),
      episode_id: nextId,
    },
    model: 'resources.film',
    pk: nextId,
  };

  if (action === 'add') {
    film.fields.edited = created.toISOString();

    addNewFilm(film).then(() => {
      redirectMainPage();
    });
  }

  if (action === 'update') {
    film.fields.created = previous.created;
    film.fields.episode_id = previous.episodeId;
    film.pk = previous.episodeId;

    editFilm(film, previous.docId)
      .then(() => new Promise(resolve => {
          filmService.deleteEditableFilmFromLocalStorage();
          resolve(true);
        })
        .then(() => redirectMainPage()));
  }
}
