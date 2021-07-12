import { LocalStorageKeys } from '../enums';
import { FilmDto } from '../models/film-dto';

/**
 * Manages the film data of the application.
 */
export class FilmService {
  /**
   * List of films.
   */
  public readonly films: FilmDto[];

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
    this.films = [];
  }

  /**
   * Add film in FilmService local variable films.
   * @param film Film to add in films list.
   */
  public add(film: FilmDto): void {
    this.films.push(film);
  }

  /**
   * Add film in localStorage for next steps.
   * @param film Film to add in localStorage.
   */
  public addFilmToLocalStorage(film: FilmDto): void {
    localStorage.setItem(LocalStorageKeys.Film, JSON.stringify(film));
  }

  /**
   * Delete film located in localStorage from there.
   */
  public deleteFilmFromLocalStorage(): void {
    localStorage.removeItem(LocalStorageKeys.Film);
  }

  /**
   * Get film from localStorage.
   * @returns Film located in localStorage or null if film is not located in storage.
   */
  public getFilmFromLocalStorage(): FilmDto | null {
    const film = JSON.parse(localStorage.getItem(LocalStorageKeys.Film) || 'null');

    return film;
  }

  /**
   * Add all collection data for add and edit films.
   * @param collectionData Data for save in local storage.
   */
  public addCollectionDataToLocalStorage(collectionData: Object[]): void {
    localStorage.setItem(LocalStorageKeys.Collection, JSON.stringify(collectionData));
  }

  /**
   * Get collection data from localStorage.
   * @returns Current collection data saved in localStorage.
   */
  public getCollectionDataFromLocalStorage(): Object[] | null {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.Collection) || 'null');
  }

  /**
   * Count and get next id for next film.
   * @returns Id for next film.
   */
  public getNextIdForFilm(): number {
    const allFilms = this.getAllFilmsFromLocalStorage() as FilmDto[];
    const sortedFilms = [...allFilms];
    sortedFilms.sort((a, b) => a.episodeId - b.episodeId);

    const lastItem = sortedFilms.pop() || null;

    if (lastItem) {
      return lastItem.episodeId + 1;
    }

    return 1;
  }

  /**
   * Add all films in LS.
   * @param films List of all films.
   */
  public addAllFilmsToLocalStorage(films: FilmDto[]): void {
    localStorage.setItem(LocalStorageKeys.AllFilms, JSON.stringify(films));
  }

  /**
   * Get all films located in LocalStorage.
   * @returns All films from LS.
   */
  public getAllFilmsFromLocalStorage(): FilmDto[] | null {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.AllFilms) || 'null');
  }

  /**
   * Add film in localStorage for edit.
   * @param film Film to add in localStorage.
   */
  public addEditableFilmToLocalStorage(film: FilmDto): void {
    localStorage.setItem(LocalStorageKeys.EditableFilm, JSON.stringify(film));
  }

  /**
   * Delete edited film located in localStorage from there.
   */
  public deleteEditableFilmFromLocalStorage(): void {
    localStorage.removeItem(LocalStorageKeys.EditableFilm);
  }

  /**
   * Get film from localStorage.
   * @returns Film for edit located in localStorage or null if film is not located in storage.
   */
  public getEditableFilmFromLocalStorage(): FilmDto | null {
    const film = JSON.parse(localStorage.getItem(LocalStorageKeys.EditableFilm) || 'null');

    return film;
  }
}
