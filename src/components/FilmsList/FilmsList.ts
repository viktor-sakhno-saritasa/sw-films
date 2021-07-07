import { Film } from '../../film-type';
import { userLocalStorageType } from '../../user-type';
import FilmItem from '../FilmItem/FilmItem';

/**
 * Creates FilmList Component.
 * @param user - The object saved in LocalStorage containing two keys: token and name.
 * @param films - Array of films.
 * @param detailsHandler - Event handler for "More Details" button.
 * @returns List with film items generated.
 */
export function FilmsList(user: userLocalStorageType, films: Film[], detailsHandler: Function): HTMLUListElement {
  const ul = document.createElement('ul');
  ul.classList.add('films-list');

  films.forEach(film => {
    ul.append(FilmItem(user, film, detailsHandler));
  });

  return ul;
}
