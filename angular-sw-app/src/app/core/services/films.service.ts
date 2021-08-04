import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DetailedFilm, Film } from '../models/film';
import { Page, PageRequest, RequestDocuments } from '../page';
import { FilmFormData, RelatedData } from '../models/film-form-data';
import { Collections } from '../collections';

import { FirestoreFilmApiService } from './firestore-film-api.service';

/** Interface for query films. */
export interface FilmQuery {

  /** Search term. */
  search: string;
}

/** Manages film's data. */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  /** Items from the film collection for realtime updates check. */
  private readonly items$: Observable<Film[]>;

  public constructor(
    private readonly apiService: FirestoreFilmApiService,
  ) {
    this.items$ = this.apiService.getFilmCollection();
  }

  /** Getter for items collection. */
  public get items(): Observable<Film[]> {
    return this.items$;
  }

  /**
   * Main method for films request.
   * @param request Data for query information.
   * @param query All search query properties.
   * @param documents Documents state for pagination.
   * @returns Observable with <Page<Film>> objects.
   */
  public getPage(request: PageRequest, query: FilmQuery, documents: RequestDocuments): Observable<Page<Film>> {
    return this.apiService.getPage(request, query, documents);
  }

  /**
   * Fetch to firestore for get film by episode id.
   * @param id Episode id of film.
   * @returns Stream of film.
   */
  public getFilm(id: number): Observable<Film | null> {
    return this.apiService.getPreviewByEpisodeId(id);
  }

  /**
   * Delete film from the firestore.
   * @param id Id of film.
   * @returns Observable for get status of delete operation.
   */
  public delete(id: number): Observable<void> {
    return this.apiService.delete(id);
  }

  /**
   * Update film in firestore.
   * @param id Id of film.
   * @param filmFormData Data from the form.
   * @returns Observable for get status of update operation.
   */
  public update(id: number, filmFormData: FilmFormData): Observable<void> {
    return this.apiService.update(id, filmFormData);
  }

  /**
   * Add film in the store.
   * @param filmFormData Data from the form.
   * @returns Observable for get status of add operation.
   */
  public addFilm(filmFormData: FilmFormData): Observable<void> {
    return this.apiService.add(filmFormData);
  }

  /**
   * Fetch to firestore for get film by episode id with related info.
   * @param id Episode id of film.
   * @returns Observable with detailed film.
   */
  public getFilmWithRelated(id: number): Observable<DetailedFilm> {
    return this.apiService.getFullByEpisodeId(id);
  }

  /**
   * Get related data.
   * @param ids Ids of collection entities.
   * @param collection Collection's name.
   * @returns Observable with entities.
   */
  public getRelatedEntities(collection: Collections, ids?: readonly number[]): Observable<RelatedData[]> {
    return this.apiService.getRelatedEntities(collection, ids);
  }
}
