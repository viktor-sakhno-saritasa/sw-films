import { FilmDto } from '../models/film-dto';
import { UserDto } from '../models/user-dto';

/**
 * Every page need their view.
 * It's base View from which inheritance occurs.
 */
abstract class View {
  /**
   * Root of app. Usually this is div with root id.
   */
  protected readonly root: HTMLElement;

  constructor() {
    this.root = document.querySelector('#root')!;
  }

  /**
   * Every view need implement this method for render.
   * User and films is not required, because can exist page
   * which can be rendered without this arguments.
   * For example, 404 page.
   * @param user Current user of application.
   * @param films List of films from firestore.
   * @param handler Event handlers for interactive with user.
   */
  abstract render(user?: UserDto, films?: FilmDto[], handler?: Function): void;
}

export default View;
