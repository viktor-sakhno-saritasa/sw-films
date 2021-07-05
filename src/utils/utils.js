import {KEY_FOR_FILM, KEY_FOR_USER, MAIN_PAGE_URL} from './consts.js';

/**
 * Adds object with user data
 * after authorization to Local Storage
 * @param {object} user - Object with token and name keys
 */
export function addUserToLocalStorage(user) {
  localStorage.setItem(KEY_FOR_USER, JSON.stringify(user));
}

/**
 * Check user is exists for correct render pages
 * @return {object | null} Return object if user
 * is exists in local storage else null
 */
export function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem(KEY_FOR_USER) || 'null');
}

/**
 * Delete current user from localStorage
 */
export function deleteUserFromLocalStorage() {
  localStorage.removeItem(KEY_FOR_USER);
}

/**
 * Return to the main page with films
 */
export function openStartPage() {
  window.location.assign(MAIN_PAGE_URL);
}

/**
 * Sorts films by episode
 * Creates new array
 * @param {Film[]} films - List of films for sorting
 * @param {boolean} orderByAscending True if ascending sort, else descending
 * @return {Film[]} New sorted list of films
 */
export function sortFilms(films, orderByAscending) {
  const sortedFilms =  [...films];

  const ascending = (a, b) => a.episodeId - b.episodeId;
  const descending = (a, b) => b.episodeId - a.episodeId;

  if (orderByAscending) {
    return sortedFilms.sort(ascending);
  }

  return sortedFilms.sort(descending);
}

/**
 * Adds object with film data
 * after clicking the "More Details" button
 * for later display on the Film Page
 * @param {Film} film - Film instance to add to LocalStorage
 */
export function addFilmToLocalStorage(film) {
  localStorage.setItem(KEY_FOR_FILM, JSON.stringify(film));
}


/**
 * Receives a film data in case it is saved in storage
 * @return {object | null} Return object if films
 * is exists in local storage else null.
 */
export function getFilmFromLocalStorage() {
  return JSON.parse(localStorage.getItem(KEY_FOR_FILM) || 'null');
}

/**
 * Delete current film from localStorage if user logout.
 */
export function deleteFilmFromLocalStorage() {
  localStorage.removeItem(KEY_FOR_FILM);
}

/**
 * Delete User and Film data from LocalStore if logout.
 */
export function logout() {
  deleteUserFromLocalStorage();
  deleteFilmFromLocalStorage();
}
