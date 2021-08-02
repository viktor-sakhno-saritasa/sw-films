import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentReference, Query } from '@angular/fire/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { map, catchError, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';

import { DetailedFilm, Film } from '../models/film';
import { FilmDto, RelatedStarhips, RelatedVehicles, RelatedWithName } from '../models/film-dto';
import { Page, PageRequest, RequestDocuments } from '../page';
import { FilmsMapper } from '../films-mapper';
import { FilmFormData } from '../models/film-form-data';
import { FormMapper } from '../form-mapper';

/** Interface for query films. */
export interface FilmQuery {

  /** Search term. */
  search: string;
}

/** Key of the films collection. */
const COLLECTION_KEY = 'films';

/** Property for name filter. */
const NAME_FILTER = 'fields.title';

/** Manages film's data. */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  public constructor(
    private readonly firestore: AngularFirestore,
    private readonly mapper: FilmsMapper,
    private readonly formMapper: FormMapper,
  ) {}

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

    /** Get observable. */
    return this.firestore.collection(COLLECTION_KEY, queryFn)
      .snapshotChanges()
      .pipe(

        /** Get raw docs for save in entries variables for cursor paginate. */
        map(actions => actions.map(action => action.payload.doc)),

        /** Save docs. */
        tap(docs => {
          documents.firstEntryInResponse = this.getOneFromList(docs, true);
          documents.latestEntryInResponse = this.getOneFromList(docs, false);
        }),

        /** Map documents to domain model. */
        map(docs => docs.map(doc => this.mapper.dtoToFilmModelMapper(doc.data() as FilmDto))),

        /** Complete previous observable and get new for know size of docs. */
        switchMap(films => this.firestore.collection(COLLECTION_KEY, ref =>

          /** If search field is not empty apply filter option. */
          this.applyFilterOption(ref, query.search.trim())).get()
          .pipe(
            distinctUntilChanged(),
            map(snap => snap.size),

            /** Return Observable<Page<Film>> object to continue. */
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
   * Fetch to firestore for get film by episode id.
   * @param id Episode id of film.
   * @returns Stream of film.
   */
  public getFilm(id: number): Observable<Film | null> {
    return this.firestore.collection<FilmDto>(COLLECTION_KEY, ref => ref.where('fields.episode_id', '==', id))
      .valueChanges()
      .pipe(
        map(films => this.getOneFromList(films, true)),
        map(film => film ? this.mapper.dtoToFilmModelMapper(film) : null),
        catchError(this.handleError<Film>('getFilm')),
      );
  }

  /**
   * Delete film from the firestore.
   * @param id Id of film.
   * @returns Observable for get status of delete operation.
   */
  public delete(id: number): Observable<void> {
    return this.firestore.collection<FilmDto>(COLLECTION_KEY, ref => ref
      .where('fields.episode_id', '==', id))
      .get()
      .pipe(
        map(data => data.docs.forEach(doc => of(this.firestore.collection<FilmDto>(COLLECTION_KEY).doc(doc.id)
          .delete()))),
      );
  }

  /**
   * Update film in firestore.
   * @param id Id of film.
   * @param filmFormData Data from the form.
   * @returns Observable for get status of update operation.
   */
  public update(id: number, filmFormData: FilmFormData): Observable<Promise<void>> {
    return this.firestore.collection<FilmDto>(COLLECTION_KEY, ref => ref
      .where('fields.episode_id', '==', id))
      .get()
      .pipe(
        map(data => this.getOneFromList(data.docs, true)),
        map(doc => ({ doc, dto: this.formMapper.editFormDataToFilmDto(filmFormData, this.mapper.dtoToFilmModelMapper(doc.data())) })),
        switchMap(data => of(this.firestore.collection<FilmDto>(COLLECTION_KEY).doc(data.doc.id)
          .set(data.dto))),
      );
  }

  /**
   * Add film in the firestore.
   * @param filmFormData Data from the form.
   * @returns Observable for get status of add operation.
   */
  public addFilm(filmFormData: FilmFormData): Observable<DocumentReference> {
    return this.firestore.collection<FilmDto>(COLLECTION_KEY, ref => ref
      .orderBy('fields.episode_id', 'desc')
      .limit(1))
      .get()
      .pipe(
        map(data => this.getOneFromList(data.docs, true)),
        map(film => film.data()),
        map(film => film.fields.episode_id + 1),
        map(episode => this.formMapper.addFormDataToFilmDto(filmFormData, episode)),
        switchMap(filmDto => this.firestore.collection<FilmDto>(COLLECTION_KEY).add(filmDto)),
      );
  }

  /**
   * Fetch to firestore for get film by episode id with related info.
   * @param id Episode id of film.
   * @returns Observable with detailed film.
   */
  public getFilmWithRelated(id: number): Observable<DetailedFilm> {

    return this.firestore.collection<FilmDto>(COLLECTION_KEY, ref => ref.where('fields.episode_id', '==', id))
      .valueChanges()
      .pipe(
        map(films => this.getOneFromList(films, true)),
        map(film => this.mapper.dtoToFilmModelMapper(film)),
        switchMap(film => combineLatest(
            of(film),
            this.getRelatedInfoWithName(film.planets, 'planets', false),
            this.getRelatedInfoWithName(film.characters, 'people', false),
            this.getRelatedInfoWithName(film.species, 'species', false),
            this.getRelatedStarships(film.starships, 'starships', false),
            this.getRelatedVehicle(film.vehicles, 'vehicles', false),
        )),
        map(([film, planets, characters, species, starships, vehicles]) => {
          const detailedFilm = new DetailedFilm(film, planets, characters, species, starships, vehicles);
          return detailedFilm;
        }),
        catchError(this.handleError<DetailedFilm>('getFilm')),
      );
  }

  /**
   * Get related data with field name.
   * @param ids Ids of collection entities.
   * @param collection Collection's name.
   * @param all If true, it is mean get all entities.
   * @returns Observable with list with names.
   */
  public getRelatedInfoWithName(ids: readonly number[], collection: string, all: boolean): Observable<RelatedWithName[]> {

    if (all) {
      return this.firestore.collection<RelatedWithName>(collection)
        .valueChanges()
        .pipe(
          map(items => items),
        );
    }

    const observables = (ids.map(id => this.firestore.collection<RelatedWithName>(collection, ref => ref.where('pk', '==', id))
      .valueChanges()
      .pipe(
          map(items => this.getOneFromList(items, true)),
          map(item => item),
      )));

    return combineLatest(observables);
  }

  /**
   * Get related data without name field.
   * @param ids Ids of collection entities.
   * @param collection Collection's name.
   * @param all If true, it is mean get all entities.
   * @returns Observable with list with primary keys.
   */
  public getRelatedStarships(ids: readonly number[], collection: string, all: boolean): Observable<RelatedStarhips[]> {

    if (all) {
      return this.firestore.collection<RelatedStarhips>(collection)
        .valueChanges()
        .pipe(
          map(items => items),
        );
    }

    const observables = (ids.map(id => this.firestore.collection<RelatedStarhips>(collection, ref => ref.where('pk', '==', id))
      .valueChanges()
      .pipe(
          map(items => this.getOneFromList(items, true)),
          map(item => item),
      )));

    return combineLatest(observables);
  }

  /**
   * Get related data without name field.
   * @param ids Ids of collection entities.
   * @param collection Collection's name.
   * @param all If true, it is mean get all entities.
   * @returns Observable with list with primary keys.
   */
  public getRelatedVehicle(ids: readonly number[], collection: string, all: boolean): Observable<RelatedVehicles[]> {

    if (all) {
      return this.firestore.collection<RelatedVehicles>(collection)
        .valueChanges()
        .pipe(
          map(items => items),
        );
    }

    const observables = (ids.map(id => this.firestore.collection<RelatedVehicles>(collection, ref => ref.where('pk', '==', id))
      .valueChanges()
      .pipe(
            map(items => this.getOneFromList(items, true)),
            map(item => item),
      )));

    return combineLatest(observables);
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

    if (request.direction === 'next') {
      /** Push document into stack for access to previous page. */
      if (documents.firstEntryInResponse) {
        documents.firstEntryInPrevResponseStack.push(documents.firstEntryInResponse);
      }
      return newQuery.startAfter(documents.latestEntryInResponse);

    } else if (request.direction === 'prev') {
      return newQuery
        .startAt(documents.firstEntryInPrevResponseStack.pop())
        .endBefore(documents.firstEntryInResponse);
    }

    /** If function run to this place, it's mean pagination need to reset. */
    this.resetPagination(documents);

    return newQuery;
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
  private applyFilterOption(ref: firebase.firestore.CollectionReference, text?: string): firebase.firestore.Query {
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

  /**
   * Safely get item from list.
   * @param list List of items.
   * @param getFirst Take first or last element. False - last.
   * @returns Item from the list.
   */
  private getOneFromList<T>(list: T[] | T | T, getFirst: boolean): T {
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
}
