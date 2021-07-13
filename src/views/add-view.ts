import createHeader from '../components/header';
import { CollectionIndexes } from '../enums';
import { collectionType, HandlersType } from '../interfaces';
import { UserDto } from '../models/user-dto';

import View from './view';

/**
 * Class for render add page.
 */
class AddView extends View {
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
   * Render add page.
   * @param collection All collection from firestore.
   * @param handlers Event handlers for add page.
   */
  public render(collection: Object[], handlers: HandlersType): void {
    const submitHandler = handlers.submitHandler as Function;
    this.loader.remove();
    this.root.insertAdjacentHTML('beforeend', this.createFormTemplate(collection));

    const form = this.getElement('#add-form');
    form.addEventListener('submit', event => submitHandler(event, 'add'));
  }

  /**
   * Create Html form template for add/edit film.
   * @param collection All collection from firestore.
   * @returns Form template.
   */
  private createFormTemplate(collection: Object[]): string {
    return `
      <form id="add-form" class="form">
        <ul class="form-list">
          <li class="form-item">
            <label class="form-label" for="title">Title</label>
            <input class="form-input" type="text" id="title"
              name="title" minlength="5" maxlength="50" placeholder="50 shades of star wars" required>
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
            ${this.createOptionsTemplate(CollectionIndexes.Characters, collection)}
            </select>
          </li>
          <li class="form-item">
            <label class="form-label" for="planets">Planets</label>
            <select id="planets" name="planets" multiple size="5" required>
            ${this.createOptionsTemplate(CollectionIndexes.Planets, collection)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="species">Species</label>
            <select id="species" name="species" multiple size="5" required>
            ${this.createOptionsTemplate(CollectionIndexes.Species, collection)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="starships">Starships</label>
            <select id="starships" name="starships" multiple size="5" required>
            ${this.createOptionsTemplate(CollectionIndexes.Starships, collection)}
            </select>
          </li>
          <li class="form-item">
          <label class="form-label" for="vehicles">Vehicles</label>
            <select id="vehicles" name="vehicles" multiple size="5" required>
            ${this.createOptionsTemplate(CollectionIndexes.Vehicles, collection)}
            </select>
          </li>
          <li class="form-item">
            <label class="form-label" for="description">Description</label>
            <textarea class="form-textarea" id="description" name="description"
              rows="5" cols="33" placeholder="It was a dark and stormy night..." required></textarea>
          </li>
        </ul>
        <button class="form-button" type="submit">Add film</button>
      </form>
    `;
  }

  /**
   * Create template for select tag.
   * @param idx Collection item index.
   * @param collection All collection data.
   * @returns Template for select depending collection index.
   */
  private createOptionsTemplate(idx: number, collection: Object[]): string {

    const options = collection[idx] as collectionType[];
    let template = '';

    options.forEach((option, index) => {
      if (idx === CollectionIndexes.Vehicles) {

        template += `<option value=${index + 1}>${index + 1}: ${option.vehicle_class}</option>`;
      } else if (idx === CollectionIndexes.Starships) {
        template += `<option value=${index + 1}>${index + 1}: ${option.starship_class}</option>`;
      } else {
        template += `<option value=${index + 1}>${option.name}</option>`;

      }
    });

    return template;
  }
}

export default AddView;
