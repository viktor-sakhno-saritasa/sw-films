import { filmLocalStorageType, Film } from './../film-type';
import { userLocalStorageType, User } from './../user-type';
import { LocalStorageKeys, PageUrls } from '../enums';

/**
 * Adds object with user data after authorization to Local Storage.
 * @param user Just logged in current user.
 */
export function addUserToLocalStorage(user: User): void {
  localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user));
}

/**
 * Check user is exists for correct render pages.
 * @return User saved in LocalStorage or nothing if user is not exists.
 */
export function getUserFromLocalStorage(): userLocalStorageType {
  return JSON.parse(localStorage.getItem(LocalStorageKeys.User) || 'null');
}

/**
 * Delete current user from localStorage.
 */
export function deleteUserFromLocalStorage(): void {
  localStorage.removeItem(LocalStorageKeys.User);
}

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
 * @param films - List of films for sorting.
 * @param orderByAscending True if ascending sort, else descending.
 * @return New sorted list of films.
 */
export function sortFilms(films: Film[], orderByAscending: boolean): Film[] {
  const sortedFilms = [...films];

  const ascending = (a: Film, b: Film): number => a.episodeId - b.episodeId;
  const descending = (a: Film, b: Film): number => b.episodeId - a.episodeId;

  if (orderByAscending) {
    return sortedFilms.sort(ascending);
  }

  return sortedFilms.sort(descending);
}

/**
 * Adds object with film data after clicking
 * the "More Details" button for later display on the Film Page.
 * @param film Film to add to LocalStorage.
 */
export function addFilmToLocalStorage(film: Film): void {
  localStorage.setItem(LocalStorageKeys.Film, JSON.stringify(film));
}

/**
 * Receives a film data in case it is saved in storage.
 * @return Film saved in LocalStorage or nothing if film is not exists.
 */
export function getFilmFromLocalStorage(): filmLocalStorageType {
  return JSON.parse(localStorage.getItem(LocalStorageKeys.Film) || 'null');
}

/**
 * Delete current film from localStorage if user logout.
 */
export function deleteFilmFromLocalStorage(): void {
  localStorage.removeItem(LocalStorageKeys.Film);
}

/**
 * Delete User and Film data from LocalStore if logout.
 */
export function logout(): void {
  deleteUserFromLocalStorage();
  deleteFilmFromLocalStorage();
  redirectMainPage();
}
