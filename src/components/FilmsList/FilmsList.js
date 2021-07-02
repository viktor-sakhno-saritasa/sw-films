import FilmItem from '../FilmItem/FilmItem.js';

/**
 * Creates FilmList Component
 * @param user
 * @param films
 * @param detailsHandler handler for FilmItem
 * @return {HTMLUListElement}
 */
export function FilmsList(user, films, detailsHandler) {
  const ul = document.createElement('ul');
  ul.classList.add('films-list');

  films.forEach(film => {
    ul.append(FilmItem(user, film, detailsHandler));
  });

  return ul;
}