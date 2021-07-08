import { FilmDto } from '../../models/film-dto';
import { UserDto } from '../../models/user-dto';

/**
 * Creates FilmItem Component.
 * And set event handler on more details button.
 * @param user - The object saved in LocalStorage containing two keys: token and name.
 * @param film - Film object.
 * @param detailsHandler - Event handler for "More Details" button.
 * @returns List Item with Film information.
 */
function FilmItem(user: UserDto, film: FilmDto, detailsHandler: Function): HTMLLIElement {
  const li = document.createElement('li');
  li.classList.add('film-item');

  li.innerHTML = `
      <div class="film-title">${film.title}</div>
      <div class="film-img">${film.episodeId}</div>
      <p class="film-description">${film.description}</p>
  `;

  if (user.name) {
    const button = document.createElement('button');
    button.classList.add('button', 'button-details');
    button.innerText = 'More details';

    button.addEventListener('click', () => {
      detailsHandler(film);
    });

    li.append(button);
  }

  return li;
}

export default FilmItem;
