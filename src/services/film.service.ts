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
   * @returns Active user located in localStorage or null if film is not located in storage.
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

  public normalizeCollectionData(): Object[] {
    const collection = this.getCollectionDataFromLocalStorage() as Object[];

    console.log(collection);
    return collection;
  }
}
