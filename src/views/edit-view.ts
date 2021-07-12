import createHeader from '../components/header';
import { collectionType } from '../interfaces';
import { FilmDto } from '../models/film-dto';
import { UserDto } from '../models/user-dto';

import View from './view';

/**
 * Class for render edit page.
 */
class EditView extends View {
  constructor() {
    super();
  }

  /**
   * Renders those elements that do not need to wait for the loading of films.
   * @param user Current user of application.
   * @param logoutHandler Event handler for logout button.
   */
  public initialRender(user: UserDto, logoutHandler: Function): void {
    this.root.append(createHeader(user, logoutHandler));
    this.loader = this.createLoader();
    this.root.append(this.loader);
  }

  /**
   * Render edit page.
   * @param collection All collection from firestore.
   * @param submitHandler Event handler for submit form.
   * @param film Film that needed to update.
   */
  public editRender(collection: Object[], submitHandler: Function, film: FilmDto): void {
    this.loader.remove();
    this.root.insertAdjacentHTML('beforeend', this.createFormTemplate(collection, film));

    const form = this.getElement('#edit-form');
    form.addEventListener('submit', event => submitHandler(event, 'update'));
  }

  public render(): void {}

  private createOptionsTemplate(collection: Object[], film: FilmDto, idx: 0 | 1 | 2): string {

    const indexes = {
      0: film.characters,
      1: film.planets,
      2: film.species,
    };

    const options = collection[idx] as collectionType[];
    let template = '';

    const param = indexes[idx];

    options.forEach((option, index) => {
      if (option.name !== undefined) {

        if (param.includes(index + 1)) {

          template += `<option selected value=${index + 1}>${option.name}</option>`;
        } else {
          template += `<option value=${index + 1}>${option.name}</option>`;
        }
      }
    });

    return template;
  }

  /**
   * Create Html form template for edit film.
   * @param collection All collection from firestore.
   * @param film Current film that needed to update.
   * @returns Form template.
   */
  private createFormTemplate(collection: Object[], film: FilmDto): string {

    const createVehiclesTemplate = (): string => {
      const vehicles = collection[5] as collectionType[];
      let template = '';

      vehicles.forEach((vehicle, index) => {
        if (vehicle.vehicle_class !== undefined) {
          if ((film.vehicles.includes(index + 1))) {
            template += `<option selected value=${index + 1}>${index + 1}: ${vehicle.vehicle_class}</option>`;
          } else {
            template += `<option value=${index + 1}>${index + 1}: ${vehicle.vehicle_class}</option>`;
          }
        }
      });

      return template;
    };

    const createStarshipsTemplate = (): string => {
      const starships = collection[3] as collectionType[];
      let template = '';

      starships.forEach((starship, index) => {
        if (starship.starship_class !== undefined) {
          if ((film.starships.includes(index + 1))) {
            template += `<option selected value=${index + 1}>${index + 1}: ${starship.starship_class}</option>`;
          } else {
            template += `<option value=${index + 1}>${index + 1}: ${starship.starship_class}</option>`;
          }
        }
      });

      return template;
    };

    return `
      <form id="edit-form" class="form">
        <ul class="form-list">
          <li class="form-item">
            <label class="form-label" for="title">Title</label>
            <input class="form-input" type="text" id="title" value="${film.title}"
              name="title" minlength="5" maxlength="50" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="director">Director</label>
            <input class="form-input" type="text" id="director" value="${film.director}"
              name="director" minlength="5" maxlength="50" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="producer">Producer</label>
            <input class="form-input" type="text" id="producer" value="${film.producer}"
              name="producer" minlength="5" maxlength="50" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="release-date">Release Date</label>
            <input class="form-input" type="date" id="release-date" value=${film.releaseDate}
              name="release-date" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="characters">Characters</label>
            <select id="characters" name="characters" multiple="multiple" size="5" required>
              ${this.createOptionsTemplate(collection, film, 0)}
            </select>
          </li>
          <li class="form-item">
            <label class="form-label" for="planets">Planets</label>
            <select id="planets" name="planets" multiple size="5" required>
              ${this.createOptionsTemplate(collection, film, 1)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="species">Species</label>
            <select id="species" name="species" multiple size="5" required>
              ${this.createOptionsTemplate(collection, film, 2)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="starships">Starships</label>
            <select id="starships" name="starships" multiple size="5" required>
              ${createStarshipsTemplate()}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="vehicles">Vehicles</label>
            <select id="vehicles" name="vehicles" multiple size="5" required>
              ${createVehiclesTemplate()}
            </select>
          </li>
          <li class="form-item">
            <label class="form-label" for="description">Description</label>
            <textarea class="form-textarea" id="description" name="description" rows="5" cols="33" required>${film.description.trim()}</textarea>
          </li>
        </ul>
        <button class="form-button" type="submit">Update film</button>
      </form>
    `;
  }
}

export default EditView;
