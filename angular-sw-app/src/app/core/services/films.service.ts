import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Film } from '../models/film';
import { FilmDto } from '../models/film-dto';

const COLLECTION_KEY = 'films';

/** Manages film's data. */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  private readonly films: Observable<Film[]>;

  /**
   * After fetch transform plain objects.
   * @param firestore For work with firestore.
   */
  public constructor(private firestore: AngularFirestore) {
    this.films = this.fetchFilms();
  }

  /**
   * Get observable for view subscribe.
   * @returns Stream of the films.
   */
  public getFilmsStream(): Observable<Film[]> {
    return this.films;
  }

  /**
   * Fetch to firestore for get film by episode id.
   * @param id Episode id of film.
   * @returns Stream of film.
   */
  public getFilm(id: number): Observable<Film> {
    return this.firestore.collection<FilmDto>(COLLECTION_KEY, ref => ref.where('fields.episode_id', '==', id))
      .valueChanges()
      .pipe(
        map(films => {
          if (films && Array.isArray(films)) {
            return films[0];
          }
          return films;
        }),
        map(film => this.dtoToFilmModelMapper(film)),
        catchError(this.handleError<Film>('getFilm')),
      );
  }

  /**
   * Fetch films collection from firestore.
   */
  private fetchFilms(): Observable<Film[]> {
    return this.firestore.collection<FilmDto>(COLLECTION_KEY).valueChanges()
      .pipe(
        catchError(this.handleError<Film[]>('fetchFilms', [])),
        map(films => films.map(film => this.dtoToFilmModelMapper(film as FilmDto))),
      );
  }

  /**
   * Transform plain object to domain model.
   * @param dto Plain object from firestore.
   * @returns Film domain.
   */
  private dtoToFilmModelMapper(dto: FilmDto): Film {
    const { fields } = dto;
    return new Film({
      characters: fields.characters,
      director: fields.director,
      planets: fields.planets,
      producer: fields.producer,
      species: fields.species,
      starships: fields.starships,
      title: fields.title,
      vehicles: fields.vehicles,
      episodeId: fields.episode_id,
      description: fields.opening_crawl,
      pk: dto.pk,
      model: dto.model,
      releaseDate: new Date(fields.release_date) as Date,
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation Name of the operation that failed.
   * @param result Optional value to return as the observable result.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`);
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
