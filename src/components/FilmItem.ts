import { IconUrls } from '../enums';
import { HandlersType } from '../interfaces';
import { FilmDto } from '../models/film-dto';
import { UserDto } from '../models/user-dto';

/**
 * Creates FilmItem Component.
 * And set event handler on more details button.
 * @param user The object saved in LocalStorage containing two keys: token and name.
 * @param film Film object.
 * @param handlers Event handlers for card.
 * @returns List Item with Film information.
 */
function FilmItem(user: UserDto, film: FilmDto, handlers: HandlersType): HTMLLIElement {
  const li = document.createElement('li');
  li.classList.add('film-item');

  li.innerHTML = `
      <div class="film-title">${film.title}</div>
      <div class="film-img">${film.episodeId}</div>
      <p class="film-description">${film.description}</p>
  `;

  if (user.name) {
    const moreButtonTemplate = `
      <button id="more-btn" type="button" class="button button-details">More details</button>
    `;

    const editButtonTemplate = `
      <button id="edit-btn" type="button" class="button button-details">
        <img src=${IconUrls.EditFilm} class="card-icon" alt="edit"/>
      </button>
    `;

    const deleteButtonTemplate = `
    <button id="delete-btn" type="button" class="button button-details">
      <img src=${IconUrls.DeleteBin} class="card-icon" alt="edit"/>
    </button>
  `;

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('film-buttons');

    buttonsWrapper.insertAdjacentHTML('beforeend', editButtonTemplate);
    buttonsWrapper.insertAdjacentHTML('beforeend', moreButtonTemplate);
    buttonsWrapper.insertAdjacentHTML('beforeend', deleteButtonTemplate);

    li.append(buttonsWrapper);

    const editButton = buttonsWrapper.querySelector('#edit-btn') as HTMLButtonElement;
    editButton.addEventListener('click', () => {
      const editHandler = handlers.editHandler as Function;
      editHandler(film);
    });

    const moreButton = buttonsWrapper.querySelector('#more-btn') as HTMLButtonElement;
    moreButton.addEventListener('click', () => {
      const detailsHandler = handlers.detailsHandler as Function;
      detailsHandler(film);
    });

    const deleteButton = buttonsWrapper.querySelector('#delete-btn') as HTMLButtonElement;
    deleteButton.addEventListener('click', () => {
      const deleteHandler = handlers.deleteHandler as Function;
      deleteHandler(film);
    });
  }

  return li;
}

export default FilmItem;
