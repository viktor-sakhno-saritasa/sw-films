import createHeader from '../components/header';
import { collectionType } from '../interfaces';
import { UserDto } from '../models/user-dto';

import View from './view';

/**
 * Class for render 404 Page.
 */
class AddView extends View {
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
   * Render add page.
   * @param collection All collection from firestore.
   */
  public addRender(collection: Object[], submitHandler: Function): void {
    this.loader.remove();
    this.root.insertAdjacentHTML('beforeend', this.createFormTemplate(collection));

    const form = this.getElement('#add-form');
    form.addEventListener('submit', event => submitHandler(event));
  }

  public render(): void {}

  /**
   * Create Html form template for add/edit film.
   * @param collection All collection from firestore.
   * @returns Form template.
   */
  private createFormTemplate(collection: Object[]): string {

    const createOptionsTemplate = (idx: number): string => {

      const options = collection[idx] as collectionType[];
      let template = '';

      options.forEach((option, index) => {
        if (option.name !== undefined) {
          template += `<option value=${index + 1}>${option.name}</option>`;
        }
      });

      return template;
    };

    const createVehiclesTemplate = (): string => {
      const vehicles = collection[5] as collectionType[];
      let template = '';

      vehicles.forEach((vehicle, index) => {
        if (vehicle.vehicle_class !== undefined) {
          template += `<option value=${index + 1}>${index + 1}: ${vehicle.vehicle_class}</option>`;
        }
      });

      return template;
    };

    const createStarshipsTemplate = (): string => {
      const starships = collection[3] as collectionType[];
      let template = '';

      starships.forEach((starship, index) => {
        if (starship.starship_class !== undefined) {
          template += `<option value=${index + 1}>${index + 1}: ${starship.starship_class}</option>`;
        }
      });

      return template;
    };

    return `
      <form id="add-form" class="form">
        <ul class="form-list">
          <li class="form-item">
            <label class="form-label" for="title">Title</label>
            <input class="form-input" type="text" id="title"
              name="title" minlength="5" maxlength="20" placeholder="50 shades of star wars" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="director">Director</label>
            <input class="form-input" type="text" id="director"
              name="director" minlength="5" maxlength="50" placeholder="George Lucas" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="producer">Producer</label>
            <input class="form-input" type="text" id="producer"
              name="producer" minlength="5" maxlength="50" placeholder="Rick McCallum" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="release-date">Release Date</label>
            <input class="form-input" type="date" id="release-date"
              name="release-date" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="characters">Characters</label>
            <select id="characters" name="characters" multiple="multiple" size="5" required>
              ${createOptionsTemplate(0)}
            </select>
          </li>
          <li class="form-item">
            <label class="form-label" for="planets">Planets</label>
            <select id="planets" name="planets" multiple size="5" required>
              ${createOptionsTemplate(1)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="species">Species</label>
            <select id="species" name="species" multiple size="5" required>
              ${createOptionsTemplate(2)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="starships">Starships</label>
            <select id="starships" name="starships" multiple size="5" required>
              ${createStarshipsTemplate()}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="transport">Transport</label>
            <select id="transport" name="transport" multiple size="5" required>
              ${createOptionsTemplate(4)}
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
            <textarea class="form-textarea" id="description"
              name="description" rows="5" cols="33" placeholder="It was a dark and stormy night..." required>
            </textarea>
          </li>
        </ul>
        <button class="form-button" type="submit">Add film</button>
      </form>
    `;
  }
}

export default AddView;
