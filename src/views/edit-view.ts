import createHeader from '../components/header';
import { CollectionIndexes } from '../enums';
import { collectionType, HandlersType } from '../interfaces';
import { FilmDto } from '../models/film-dto';
import { UserDto } from '../models/user-dto';

import View from './view';

/**
 * Class for render add page.
 */
class EditView extends View {
  /**
   * Renders those elements that do not need to wait for the loading of films.
   * @param user Current user of application.
   * @param handlers Event handlers for add page.
   */
  public initialRender(user: UserDto, handlers: HandlersType): void {
    this.root.append(createHeader(user, handlers));
    this.loader = this.createLoader();
    this.root.append(this.loader);
  }

  /**
   * Render edit page.
   * @param collection All collection from firestore.
   * @param handlers Event handlers for add page.
   * @param film Film that needed to update.
   */
  public render(collection: Object[], handlers: HandlersType, film: FilmDto): void {
    const submitHandler = handlers.submitHandler as Function;
    this.loader.remove();
    this.root.insertAdjacentHTML('beforeend', this.createFormTemplate(collection, film));

    const form = this.getElement('#edit-form');
    form.addEventListener('submit', event => submitHandler(event, 'update'));
  }

  /**
   * Create Html form template for add/edit film.
   * @param collection All collection from firestore.
   * @param film Film that needed to update.
   * @returns Form template.
   */
  private createFormTemplate(collection: Object[], film: FilmDto): string {
    return `
      <form id="edit-form" class="form">
        <ul class="form-list">
          <li class="form-item">
            <label class="form-label" for="title">Title</label>
            <input class="form-input" type="text" id="title" value="${film.title}"
              name="title" minlength="5" maxlength="50" placeholder="50 shades of star wars" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="director">Director</label>
            <input class="form-input" type="text" id="director" value="${film.director}"
              name="director" minlength="5" maxlength="50" placeholder="George Lucas" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="producer">Producer</label>
            <input class="form-input" type="text" id="producer" value="${film.producer}"
              name="producer" minlength="5" maxlength="50" placeholder="Rick McCallum" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="release-date">Release Date</label>
            <input class="form-input" type="date" id="release-date" value="${film.releaseDate}"
              name="release-date" required>
          </li>
          <li class="form-item">
            <label class="form-label" for="characters">Characters</label>
            <select id="characters" name="characters" multiple="multiple" size="5" required>
              ${this.createOptionsTemplate(CollectionIndexes.Characters, collection, film)}
            </select>
          </li>
          <li class="form-item">
            <label class="form-label" for="planets">Planets</label>
            <select id="planets" name="planets" multiple size="5" required>
              ${this.createOptionsTemplate(CollectionIndexes.Planets, collection, film)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="species">Species</label>
            <select id="species" name="species" multiple size="5" required>
              ${this.createOptionsTemplate(CollectionIndexes.Species, collection, film)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="starships">Starships</label>
            <select id="starships" name="starships" multiple size="5" required>
              ${this.createOptionsTemplate(CollectionIndexes.Starships, collection, film)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="vehicles">Vehicles</label>
            <select id="vehicles" name="vehicles" multiple size="5" required>
              ${this.createOptionsTemplate(CollectionIndexes.Vehicles, collection, film)}
            </select>
          </li>
          <li class="form-item">
            <label class="form-label" for="description">Description</label>
            <textarea class="form-textarea" id="description" name="description"
              rows="5" cols="33" required>${film.description}</textarea>
          </li>
        </ul>
        <button class="form-button" type="submit">Update film</button>
      </form>
    `;
  }

  /**
   * Create template for select tag.
   * @param idx Collection item index.
   * @param collection All collection data.
   * @param film Film for update.
   * @returns Template for select depending collection index.
   */
  private createOptionsTemplate(idx: CollectionIndexes, collection: Object[], film: FilmDto): string {

    const options = collection[idx] as collectionType[];
    let template = '';

    const dependencies = {
      0: film.characters,
      1: film.planets,
      2: film.species,
      3: film.starships,
      4: film.vehicles,
    };

    options.forEach((option, index) => {
      if (idx === CollectionIndexes.Vehicles) {
        template += dependencies[idx].includes(index + 1) ?
          `<option selected value=${index + 1}>${index + 1}: ${option.vehicle_class}</option>` :
          `<option value=${index + 1}>${index + 1}: ${option.vehicle_class}</option>`;

      } else if (idx === CollectionIndexes.Starships) {
        template += dependencies[idx].includes(index + 1) ?
          `<option selected value=${index + 1}>${index + 1}: ${option.starship_class}</option>` :
          `<option value=${index + 1}>${index + 1}: ${option.starship_class}</option>`;

      } else {
        template += dependencies[idx].includes(index + 1) ?
          `<option selected value=${index + 1}>${option.name}</option>` :
          `<option value=${index + 1}>${option.name}</option>`;
      }
    });

    return template;
  }
}

export default EditView;
