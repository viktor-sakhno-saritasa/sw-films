import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, Query, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Film } from '../models/film';
import { FilmDto } from '../models/film-dto';
import { Page, PageRequest } from '../page';
import { MappersService } from './mappers.service';

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

  /** Latest  document in response for pagination. */
  private latestEntryInResponse: QueryDocumentSnapshot<unknown> | null = null;

  /** First document in response for pagination. */
  private firstEntryInResponse: QueryDocumentSnapshot<unknown> | null = null;

  /** First document in previous response push in the stack for previous pagination. */
  private firstEntryInPrevResponseStack: QueryDocumentSnapshot<unknown>[] = [];

  /** @constructor */
  public constructor(private readonly firestore: AngularFirestore, private readonly mapper: MappersService) {}

  /**
   * Main method for films request.
   * @param request Data for query information.
   * @param query All search query properties.
   * @returns Observable with <Page<Film>> objects.
   */
  public page(request: PageRequest, query: FilmQuery): Observable<Page<Film>> {

    /** Generate query for get collection. */
    const queryFn = (ref: CollectionReference): Query => {
      return this.createQuery(ref, request, query);
    }

    /** Get observable. */
    return this.firestore.collection(COLLECTION_KEY, queryFn)
      .snapshotChanges()
      .pipe(
        /** Get raw docs for save in entries variables for cursor paginate. */
        map(actions => actions.map(action => {
          return action.payload.doc;
        })),
        /** Save docs. */
        tap(docs => {
          this.firstEntryInResponse = this.getOneFromList(docs, true);
          this.latestEntryInResponse = this.getOneFromList(docs, false);
        }),
        /** Map documents to domain model. */
        map(docs => docs.map(doc => {
          return this.mapper.dtoToFilmModelMapper(doc.data() as FilmDto);
        })),
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
  public getFilm(id: number): Observable<Film> {
    return this.firestore.collection<FilmDto>(COLLECTION_KEY, ref => ref.where('fields.episode_id', '==', id))
      .valueChanges()
      .pipe(
        map(films => this.getOneFromList(films, true)),
        map(film => this.mapper.dtoToFilmModelMapper(film)),
        catchError(this.handleError<Film>('getFilm')),
      );
  }

  /**
   * Create query for firestore collection.
   * @param ref Reference to the collection.
   * @param request Request data from table.
   * @param query All search fields.
   * @returns Query for get the collection.
   */
  private createQuery(ref: CollectionReference, request: PageRequest, query: FilmQuery): Query {
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
      if (this.firstEntryInResponse) {
        this.firstEntryInPrevResponseStack.push(this.firstEntryInResponse);
      }
      return newQuery.startAfter(this.latestEntryInResponse);

    } else if (request.direction === 'prev') {
      return newQuery
        .startAt(this.firstEntryInPrevResponseStack.pop())
        .endBefore(this.firstEntryInResponse);
    }

    /** If function run to this place, it's mean pagination need to reset. */
    this.resetPagination();

    return newQuery;
  }

  /** Reset documents state because of pagination's reset. */
  private resetPagination(): void {
    this.firstEntryInPrevResponseStack = [];
    this.firstEntryInResponse = null;
    this.latestEntryInResponse = null;
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
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`);
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
