import { HandlersType } from '../interfaces';
import { FilmDto } from '../models/film-dto';
import { UserDto } from '../models/user-dto';

import FilmItem from './FilmItem';

/**
 * Creates FilmList Component.
 * @param user The object saved in LocalStorage containing two keys: token and name.
 * @param films Array of films.
 * @param handlers Event handlers for film card.
 * @returns List with film items generated.
 */
export function FilmsList(user: UserDto, films: FilmDto[], handlers: HandlersType): HTMLUListElement {
  const ul = document.createElement('ul');
  ul.classList.add('films-list');

  films.forEach(film => {
    ul.append(FilmItem(user, film, handlers));
  });

  return ul;
}
