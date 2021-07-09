import createHeader from '../components/header';
import { PageUrls } from '../enums';
import { FilmDto } from '../models/film-dto';
import { UserDto } from '../models/user-dto';

import View from './view';

/**
 * View for Film page render.
 */
class FilmView extends View {

  constructor() {
    super();
  }

  /**
   * Renders those elements that do not need to wait for the loading of films.
   */
  public initialRender(): void {
    this.loader = this.createLoader();
    this.root.append(this.loader);
  }


  /**
   * Main function in class, that render full page.
   * @param user Current user of application.
   * @param film List of films of application.
   * @param logoutHandler Event handler for logout button.
   */
  public render(user: UserDto, logoutHandler: Function, film: FilmDto): void {
    this.root.append(createHeader(user, logoutHandler));
    this.loader.remove();
    this.root.insertAdjacentHTML('beforeend', this.createFilmPage(film));
  }

  /**
   * Collects a wrapper consisting
   * of ar components of the film page.
   * @param film - Film object that saved in LocalStorage for opening.
   * @returns Inner HTML for insert in the root element of the page.
   */
  private createFilmPage(film: FilmDto): string {
    return `
        <main class="films">
          <div class="wrapper">
            ${this.createCardTemplate(film)}
            <a class="button back-link" href=${PageUrls.Main}>Go to the main page</a>
          </div>
        </main>
      `;
  }

  /**
   * Wraps the Film entity into a card for render.
   * @param film Film object that saved in LocalStorage for opening.
   * @returns Inner HTML of film card.
   */
  private createCardTemplate(film: FilmDto): string {
    return `
        <div class="card">
          <div class="card-content">
            <h2 class="card-name card-title">${film.title}</h2>
            <div class="card-description">
              <p>${film.description}</p>
            </div>
          </div>
          <div class="card-img film-img">${film.episodeId}</div>
          <table class="card-details">
            <tr class="card-item">
              <th class="card-title">Episode</th>
              <td class="card-info">${film.episodeId}</td>
            </tr>
            <tr class="card-item">
              <th class="card-title">Release Date</th>
              <td class="card-info">${film.releaseDate}</td>
            </tr>
            <tr class="card-item">
              <th class="card-title">Director</th>
              <td class="card-info">${film.director}</td>
            </tr>
            <tr class="card-item">
              <th class="card-title">Producer</th>
              <td class="card-info">${film.producer}</td>
            </tr>
            <tr class="card-item">
              <th class="card-title">Planets</th>
              <td class="card-info">
                ${this.createSelect(film.planetsNames || [])}
              </td>
            </tr>
            <tr class="card-item">
            <th class="card-title">Characters</th>
            <td class="card-info">
              ${this.createSelect(film.charactersNames || [])}
            </td>
          </tr>
          </table>
        </div>
      `;
  }

  /**
   * Create Select Template for film page.
   * @param options List of options for select.
   * @returns
   */
  private createSelect(options: string[]): string {
    let innerContent = '';

    for (const item of options) {
      innerContent += `<option>${item}</option>`;
    }

    return `<select>${innerContent}</select>`;
  }
}

export default FilmView;
