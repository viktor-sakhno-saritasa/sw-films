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
    this.root = this.getElement('#root');
  }

  /**
   * Universal method for get element from DOM tree.
   * @param selector Search selector.
   */
  protected getElement(selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement;
  }

  /**
   * Universal method for create HtmlElement.
   * @param tag Needed tag.
   * @param className Classes for element.
   * @returns HtmlElement with classes.
   */
  protected createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);

    if (className) {
      element.classList.add(className);
    }

    return element;
  }

  /**
   * Every view need implement this method for render.
   * User and films is not required, because can exist page
   * which can be rendered without this arguments.
   * For example, 404 page.
   * @param user Current user of application.
   * @param filmsState List of films from firestore.
   * @param handler Event handlers for interactive with user.
   */
  abstract render(user?: UserDto, handler?: Function, filmsState?: FilmDto[] | FilmDto,): void;
}

export default View;
