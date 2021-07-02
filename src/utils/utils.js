import {KEY_FOR_FILM, KEY_FOR_USER, MAIN_PAGE} from './consts.js';

/**
 * Adds object with user data
 * after authorization to Local Storage
 * @param {object} user
 */
export function addUserToLocalStorage(user) {
  localStorage.setItem(KEY_FOR_USER, JSON.stringify(user));
}

/**
 * Check user is exists for correct render pages.
 * @return {any} Return object if user
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
 * Return to the main1 page with films
 */
export function openStartPage() {
  window.location.assign(MAIN_PAGE);
}

/**
 * Sorts films by episode.
 * Creates new array.
 * @param films list of films for sorting
 * @param orderByAscending boolean
 * @returns {Array} new sorted list of films
 */
export function sortFilms(films, orderByAscending) {
  const sorted =  [...films];

  const ascending = (a, b) => a.episodeId - b.episodeId;
  const descending = (a, b) => b.episodeId - a.episodeId;

  if (orderByAscending) {
    return sorted.sort(ascending);
  }

  return sorted.sort(descending);
}

export function addFilmToLocalStorage(film) {
  localStorage.setItem(KEY_FOR_FILM, JSON.stringify(film));
}

export function getFilmFromLocalStorage() {
  return JSON.parse(localStorage.getItem(KEY_FOR_FILM) || 'null');
}

export function deleteFilmFromLocalStorage() {
  localStorage.removeItem(KEY_FOR_FILM);
}
