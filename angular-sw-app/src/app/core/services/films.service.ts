import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, Query, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, catchError, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { DetailedFilm, Film } from '../models/film';
import { FilmDto, RelatedWithName, RelatedWithPK } from '../models/film-dto';
import { Page, PageRequest, RequestDocuments } from '../page';
import { FilmsMapper } from '../films-mapper';

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
  /** @constructor */
  public constructor(private readonly firestore: AngularFirestore, private readonly mapper: FilmsMapper) {}

  /**
   * Main method for films request.
   * @param request Data for query information.
   * @param query All search query properties.
   * @param documents Documents state for pagination.
   * @returns Observable with <Page<Film>> objects.
   */
  public getPage(request: PageRequest, query: FilmQuery, documents: RequestDocuments): Observable<Page<Film>> {

    /** Generate query for get collection. */
    const queryFn = (ref: CollectionReference): Query => {
      return this.createQuery(ref, request, query, documents);
    }

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
            map(size => {
              return {
                content: films,
                number: request.page,
                size: request.size,
                direction: request.direction,
                totalElements: size,
              }
            }),
          ),
        ),
      )
    ;
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
        switchMap(film => {
          return combineLatest(
            of(film),
            this.getRelatedInfoWithName(film.planets, 'planets'),
            this.getRelatedInfoWithName(film.characters, 'people'),
            this.getRelatedInfoWithName(film.species, 'species'),
            this.getRelatedInfoWithPK(film.starships, 'starships'),
            this.getRelatedInfoWithPK(film.vehicles, 'vehicles'),
          )
        }),
        map(([film, planets, characters, species, starships, vehicles]) => {
          return new DetailedFilm(film, planets, characters, species, starships, vehicles);
        }),
        catchError(this.handleError<DetailedFilm>('getFilm')),
      );
  }

  /**
   * Get related data with field name.
   * @param ids Ids of collection entities.
   * @param collection Collection's name.
   * @returns Observable with list with names.
   */
  public getRelatedInfoWithName(ids: readonly number[], collection: string): Observable<string[]> {
    const observables = (ids.map(id => {
      return this.firestore.collection<RelatedWithName>(collection, ref => ref.where('pk', '==', id))
        .valueChanges()
        .pipe(
          map(items => this.getOneFromList(items, true)),
          map(item => item.fields.name),
        )
    }))

    return combineLatest(observables);
  }

  /**
   * Get related data without name field.
   * @param ids Ids of collection entities.
   * @param collection Collection's name.
   * @returns Observable with list with primary keys.
   */
  public getRelatedInfoWithPK(ids: readonly number[], collection: string): Observable<number[]> {

    const observables = (ids.map(id => {
      return this.firestore.collection<RelatedWithPK>(collection, ref => ref.where('pk', '==', id))
        .valueChanges()
        .pipe(
          map(items => this.getOneFromList(items, true)),
          map(item => item.pk),
        )
    }))

    return combineLatest(observables);
  }

  /**
   * Create query for firestore collection.
   * @param ref Reference to the collection.
   * @param request Request data from table.
   * @param query All search fields.
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

  /** Reset documents state because of pagination's reset. */
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
   * @returns End char code
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
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`);
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
