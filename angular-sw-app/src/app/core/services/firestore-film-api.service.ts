import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, Query } from '@angular/fire/firestore';
import { combineLatest, from, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { FilmFormMapper } from '../film-form-mapper';
import { FilmsMapper } from '../films-mapper';
import { DetailedFilm, Film } from '../models/film';
import { FilmDto } from '../models/film-dto';
import { FilmFormData, RelatedData } from '../models/film-form-data';
import { Page, PageRequest, RequestDocuments } from '../page';

import { FilmApiService } from './film-api-service';
import { FilmQuery } from './films.service';

export type FirestoreQuery = (ref: CollectionReference) => Query;

/** Key of the films collection. */
const COLLECTION_KEY = 'films';

/** Property for name filter. */
const NAME_FILTER = 'fields.title';

/** Property for id filter. */
const EPISODE_FILTER = 'fields.episode_id';

/** Firestore api service for films management. */
@Injectable({
  providedIn: 'root',
})
export class FirestoreFilmApiService implements FilmApiService {

  public constructor(
    private readonly afs: AngularFirestore,
    private readonly filmMapper: FilmsMapper,
    private readonly filmFormMapper: FilmFormMapper,
  ) { }

  /**
   * Add film in the firestore.
   * @param filmData Data from the form.
   */
  public add(filmData: FilmFormData): Observable<void> {
    return this.afs.collection<FilmDto>(COLLECTION_KEY, ref => ref
      .orderBy(EPISODE_FILTER, 'desc')
      .limit(1))
      .get()
      .pipe(
        map(data => this.getOneFromList(data.docs, true)),
        map(film => film.data()),
        map(film => film.fields.episode_id + 1),
        map(episode => this.filmFormMapper.addFormDataToFilmDto(filmData, episode)),
        switchMap(filmDto => this.afs.collection<FilmDto>(COLLECTION_KEY).add(filmDto)),
        map(() => void 0),
      );
  }

  /**
   * Update film in firestore.
   * @param id Id of film.
   * @param filmData Data from the form.
   * @returns Observable for get status of update operation.
   */
  public update(id: number, filmData: FilmFormData): Observable<void> {
    return this.afs.collection<FilmDto>(COLLECTION_KEY, ref => ref
      .where(EPISODE_FILTER, '==', id))
      .get()
      .pipe(
        map(data => this.getOneFromList(data.docs, true)),
        map(doc => ({ doc, dto: this.filmFormMapper.editFormDataToFilmDto(filmData, this.filmMapper.dtoToFilmModelMapper(doc.data())) })),
        switchMap(data => from(this.afs.collection<FilmDto>(COLLECTION_KEY).doc(data.doc.id)
          .set(data.dto))),
      );
  }

  /**
   * Delete film from the firestore.
   * @param id Id of film.
   * @returns Observable for get status of delete operation.
   */
  public delete(id: number): Observable<void> {
    return this.afs.collection<FilmDto>(COLLECTION_KEY, ref => ref
      .where('fields.episode_id', '==', id))
      .get()
      .pipe(
        map(data => data.docs.forEach(doc => of(this.afs.collection<FilmDto>(COLLECTION_KEY).doc(doc.id)
          .delete()))),
      );
  }

  /**
   * Fetch to firestore for get film by episode id.
   * @param id Episode id of film.
   * @returns Stream of film.
   */
  public getPreviewByEpisodeId(id: number): Observable<Film | null> {
    return this.afs.collection<FilmDto>(COLLECTION_KEY, ref => ref.where('fields.episode_id', '==', id))
      .valueChanges()
      .pipe(
        map(films => this.getOneFromList(films, true)),
        map(film => film ? this.filmMapper.dtoToFilmModelMapper(film) : null),
        catchError(this.handleError<Film>('getFilm')),
      );
  }

  /**
   * Get related data.
   * @param ids Ids of collection entities.
   * @param collection Collection's name.
   * @returns Observable with entities.
   */
  public getRelatedEntities(collection: string, ids?: readonly number[]): Observable<RelatedData[]> {

    if (!ids) {
      return this.afs.collection<RelatedData>(collection)
        .valueChanges()
        .pipe(
          map(items => items),
        );
    }

    const observables = (ids.map(id => this.afs.collection<RelatedData>(collection, ref => ref.where('pk', '==', id))
      .valueChanges()
      .pipe(
            map(items => this.getOneFromList(items, true)),
            map(item => item),
      )));

    return combineLatest(observables);
  }

  /**
   * Fetch to firestore for get film by episode id with related info.
   * @param id Episode id of film.
   * @returns Observable with detailed film.
   */
  public getFullByEpisodeId(id: number): Observable<DetailedFilm> {

    return this.afs.collection<FilmDto>(COLLECTION_KEY, ref => ref.where(EPISODE_FILTER, '==', id))
      .valueChanges()
      .pipe(
        map(films => this.getOneFromList(films, true)),
        switchMap(item => {
            if (item) {
              const filmModel = this.filmMapper.dtoToFilmModelMapper(item);
              return combineLatest([
                of(filmModel),
                this.getRelatedEntities('planets', filmModel.planets),
                this.getRelatedEntities('people', filmModel.characters),
                this.getRelatedEntities('species', filmModel.species),
                this.getRelatedEntities('starships', filmModel.starships),
                this.getRelatedEntities('vehicles', filmModel.vehicles),
              ]).pipe(
                map(([film, planets, characters, species, starships, vehicles]) => {
                  const detailedFilm = new DetailedFilm(film, planets, characters, species, starships, vehicles);
                  return detailedFilm;
                }),
              );
            }
            return of(item);
          }),
        catchError(this.handleError<DetailedFilm>('getFilm')),
      );
  }

  /**
   * Get all collection as observable.
   * @returns Collection of the films.
   */
  public getFilmCollection(): Observable<Film[]> {
    return this.afs.collection<FilmDto>(COLLECTION_KEY).valueChanges()
      .pipe(
        map(films => films.map(this.filmMapper.dtoToFilmModelMapper)),
      );
  }

  /**
   * Main method for films request.
   * @param request Data for query information.
   * @param query All search query properties.
   * @param documents Documents state for pagination.
   * @returns Observable with <Page<Film>> objects.
   */
  public getPage(request: PageRequest, query: FilmQuery, documents: RequestDocuments): Observable<Page<Film>> {

    /**
     * Generate query for get collection.
     * @param ref Collection reference of firestore.
     * @returns Query function for get collection.
     */
    const queryFn = (ref: CollectionReference): Query => this.createQuery(ref, request, query, documents);

    return this.afs.collection(COLLECTION_KEY, queryFn)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => action.payload.doc)),
        tap(docs => {
          documents.firstEntryInResponse = this.getOneFromList(docs, true);
          documents.latestEntryInResponse = this.getOneFromList(docs, false);
        }),
        map(docs => docs.map(doc => this.filmMapper.dtoToFilmModelMapper(doc.data() as FilmDto))),
        switchMap(films => this.afs.collection(COLLECTION_KEY, ref =>
          this.applyFilterOption(ref, query.search.trim())).get()
          .pipe(
            distinctUntilChanged(),
            map(snap => snap.size),
            map(size => ({
                content: films,
                number: request.page,
                size: request.size,
                direction: request.direction,
                totalElements: size,
            })),
          )),
      );
  }

  /**
   * Create query for firestore collection.
   * @param ref Reference to the collection.
   * @param request Request data from table.
   * @param query All search fields.
   * @param documents List of documents for pagination.
   * @returns Query for get the collection.
   */
  private createQuery(ref: CollectionReference, request: PageRequest, query: FilmQuery, documents: RequestDocuments): Query {
    let newQuery;

    /** Firestore allow order by only same field as a search property. */
    if (query.search.trim()) {
      newQuery = this.applyFilterOption(ref, query.search.trim())
        .orderBy(NAME_FILTER, request.sort.order)
        .limit(request.size);
    } else {
      newQuery = ref
        .orderBy(request.sort.property, request.sort.order)
        .limit(request.size);
    }

    return this.updateQueryWithDocs(newQuery, documents, request.direction);
  }


  /**
   * Safely get item from list.
   * @param list List of items.
   * @param getFirst Take first or last element. False - last.
   * @returns Item from the list.
   */
  private getOneFromList<T>(list: T[] | T, getFirst: boolean): T {
    if (list && Array.isArray(list)) {
      return getFirst ? list[0] : list[list.length - 1];
    }

    /** If it is not list. */
    return list;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation Name of the operation that failed.
   * @param result Optional value to return as the observable result.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {

        console.error(`${operation} failed: ${error}`);
        console.error(error);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
  }

  /**
   * Update pagination documents and apply common query conditions.
   * @param query All search fields.
   * @param documents List of documents for pagination.
   * @param direction Direction of pagination.
   * @returns Updated query.
   */
  private updateQueryWithDocs(query: Query, documents: RequestDocuments, direction: 'next' | 'prev' | ''): Query {
    if (direction === 'next') {
      if (documents.firstEntryInResponse) {
        documents.firstEntryInPrevResponseStack.push(documents.firstEntryInResponse);
      }
      return query.startAfter(documents.latestEntryInResponse);
    } else if (direction === 'prev') {
      return query
        .startAt(documents.firstEntryInPrevResponseStack.pop())
        .endBefore(documents.firstEntryInResponse);
    }
    this.resetPagination(documents);
    return query;
  }

  /**
   * Reset documents state because of pagination's reset.
   * @param documents List of documents for pagination.
   */
  private resetPagination(documents: RequestDocuments): void {
    documents.firstEntryInPrevResponseStack = [];
    documents.firstEntryInResponse = null;
    documents.latestEntryInResponse = null;
  }

  /**
   * Applies search terms by name.
   * Unfortunately, firestore don't have 'contains' method for strings.
   * @param ref Document reference.
   * @param text Search text.
   * @returns Query for firestore request.
   */
  private applyFilterOption(ref: CollectionReference, text?: string): Query {
    if (text) {
      return ref.where(NAME_FILTER, '>=', text).where(NAME_FILTER, '<', this.getEndCodeForFirestoreQuery(text));
    }
    return ref;
  }

  /**
   * Replace end symbol of text for query.
   * @param text Text for query.
   * @returns End char code.
   */
  private getEndCodeForFirestoreQuery(text: string): string {
    return text.replace(/.$/, symbol => String.fromCharCode(symbol.charCodeAt(0) + 1));
  }

}
