import FilmItem from '../FilmItem/FilmItem.js';

/**
 * Creates FilmList Component
 * @param {object} user - The object saved in LocalStorage containing two keys: token and name
 * @param {Film[]} films - List of Film instances
 * @param {function} detailsHandler - Event handler for "More Details" button
 * @return {HTMLUListElement} List with film items generated
 */
export function FilmsList(user, films, detailsHandler) {
  const ul = document.createElement('ul');
  ul.classList.add('films-list');

  films.forEach(film => {
    ul.append(FilmItem(user, film, detailsHandler));
  });

  return ul;
}