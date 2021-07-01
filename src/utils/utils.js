/**
 * Adds object with user data
 * after authorization to Local Storage
 * @param {object} user
 */
import {KEY_FOR_USER, MAIN_PAGE} from './consts.js';

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
 * Return to the main page with films
 */
export function openStartPage() {
  window.location.assign(MAIN_PAGE);
}

/**
 *
 * @param films
 * @param isAscending
 * @return {array}
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