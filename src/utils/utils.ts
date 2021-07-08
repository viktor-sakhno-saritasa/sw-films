import { PageUrls } from '../enums';
import { FilmDto } from '../models/film-dto';

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
