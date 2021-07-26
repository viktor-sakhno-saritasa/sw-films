import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, Query, QueryDocumentSnapshot, QueryFn } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, catchError, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';

import firebase from 'firebase/app';

import { Film } from '../models/film';
import { FilmDto } from '../models/film-dto';
import { SortDirection } from '@angular/material/sort';
import { Page, PageRequest } from '../page';

export interface FilmQuery {
  search: string;
}

/** Key of the films collection. */
const COLLECTION_KEY = 'films';

/** Default key for sorting. */
const EPISODE_SORT = 'fields.episode_id';

/** Default limit for page size */
const DEFAULT_LIMIT = 3;

const NAME_FILTER = 'fields.title';

const PK = 'pk';

/** Manages film's data. */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  /** Local films Subject for trigger films observable. */
  // private _filmsSubject$: BehaviorSubject<Film[]>;

  /** Observable for subscribe in components. */
  // public readonly films$: Observable<Film[]>;

  /** Latest  document in response for pagination. */
  private latestEntryInResponse: QueryDocumentSnapshot<unknown> | null = null;

  /** First document in response for pagination. */
  private firstEntryInResponse: QueryDocumentSnapshot<unknown> | null = null;

  /** First document in previous response for previous pagination. */
  private firstEntryInPrevResponse: QueryDocumentSnapshot<unknown> | undefined;

  private firstEntryInPrevResponseStack: QueryDocumentSnapshot<unknown>[] = [];

  // private readonly films: Observable<Film[]>;

  /**
   * After fetch transform plain objects.
   * @param firestore For work with firestore.
   */
  public constructor(private firestore: AngularFirestore) {
    // this.films = this.fetchFilms();
    // this._filmsSubject$ = new BehaviorSubject<Film[]>([]);
    // this.films$ = this._filmsSubject$.asObservable();
  }

  public page(request: PageRequest, query: FilmQuery): Observable<Page<Film>> {

    const queryFn = (ref: CollectionReference): Query => {

      let newQuery;

      if (query.search.trim()) {
        return this.applyFilterOption(ref, query.search.trim())
          .orderBy('fields.title', request.sort.order)
          .limit(request.size);
      }

      newQuery = ref
        .orderBy(request.sort.property, request.sort.order)
        .limit(request.size);

      if (request.direction === 'next') {

        if (this.firstEntryInResponse) {
          this.firstEntryInPrevResponseStack.push(this.firstEntryInResponse);
        }

        return newQuery.startAfter(this.latestEntryInResponse)

      } else if (request.direction === 'prev') {

        return newQuery
          .startAt(this.firstEntryInPrevResponseStack.pop())
          .endBefore(this.firstEntryInResponse)

      }

      this.firstEntryInPrevResponseStack = [];
      this.firstEntryInResponse = null;
      this.latestEntryInResponse = null;

      return newQuery;
    }

    return this.firestore.collection(COLLECTION_KEY, queryFn)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          return action.payload.doc;
        })),
        tap(docs => {
          this.firstEntryInResponse = this.getOneFromList(docs, true);
          this.latestEntryInResponse = this.getOneFromList(docs, false);
        }),
        map(docs => docs.map(doc => {
          return this.dtoToFilmModelMapper(doc.data() as FilmDto);
        })),
        switchMap(films => this.firestore.collection(COLLECTION_KEY, ref =>
          this.applyFilterOption(ref, query.search.trim())).get()
          .pipe(
            distinctUntilChanged(),
            map(snap => snap.size),
            map(size => {
              return {
                content: films,
                number: request.page,
                size: request.size,
                direction: request.direction,
                totalElements: size,
              }
            }),
            tap(args => console.log('CLICK', args)),
          ),
        ),
      );
  }


  public getFilms(
    filter = '',
    sortOrder: firebase.firestore.OrderByDirection = 'asc',
    direction?: string,
  ) {

    if (direction) {
      console.log('OOoop1')
      return direction === 'next' ? this.next(filter, sortOrder)
        : direction === 'prev' ? this.prev(filter, sortOrder)
        : this.first(filter, sortOrder);
    }
    /** Add checks for direction. */
    console.log('OOoop2')

    return this.first(filter, sortOrder);
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
   * Initialize pagination in component.
   * In first run init latest and first docs.
   */
  public first(filter: string, sortOrder: firebase.firestore.OrderByDirection): Observable<Film[]> {

    this.firstEntryInPrevResponseStack = [];
    this.firstEntryInResponse = null;
    this.latestEntryInResponse = null;

    console.log('OOP!')

    return this.getFilmsCollection(ref => {
      if (filter) {
        return this.applyFilterOption(ref, filter).limit(DEFAULT_LIMIT).orderBy(NAME_FILTER, sortOrder);
      }
      return ref.limit(DEFAULT_LIMIT).orderBy(EPISODE_SORT, sortOrder);
    })
    // .subscribe(films => {
    //   this._filmsSubject$.next(films);
    // });
  }

  public next(filter: string, sortOrder: firebase.firestore.OrderByDirection): Observable<Film[]> {
    if (this.firstEntryInResponse) {
      this.firstEntryInPrevResponseStack.push(this.firstEntryInResponse);
    }

    return this.getFilmsCollection(ref => ref
      .orderBy(EPISODE_SORT, sortOrder)
      .startAfter(this.latestEntryInResponse)
      .limit(DEFAULT_LIMIT))
      // .subscribe(films => {
      //   this._filmsSubject$.next(films);
      // })
  }

  public prev(filter: string, sortOrder: firebase.firestore.OrderByDirection): Observable<Film[]> {
    return this.getFilmsCollection(ref => ref
      .orderBy(EPISODE_SORT, sortOrder)
      .startAt(this.firstEntryInPrevResponseStack.pop())
      .endBefore(this.firstEntryInResponse)
      .limit(DEFAULT_LIMIT))
      // .subscribe(films => {
      //   this._filmsSubject$.next(films);
      // })
  }

  public getSize(filter = ''): Observable<number> {
    return this.firestore.collection(COLLECTION_KEY, ref => {
      return this.applyFilterOption(ref)
    }).get()
      .pipe(
        distinctUntilChanged(),
        map(snap => snap.size),
      );
  }

  /**
   * Get films collection and also save last and first docs in request for pagination.
   * @param queryFn Query function for request collection from firestore.
   * @returns Observable for subscribe.
   */
  private getFilmsCollection(queryFn?: QueryFn): Observable<Film[]> {
    return this.firestore.collection(COLLECTION_KEY, queryFn).snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          return action.payload.doc;
        })),
        tap(docs => {
          this.firstEntryInResponse = this.getOneFromList(docs, true);
          this.latestEntryInResponse = this.getOneFromList(docs, false);
        }),
        map(docs => docs.map(doc => {
          return this.dtoToFilmModelMapper(doc.data() as FilmDto);
        })),
      );
  }

  private applyOrderOption(ref: firebase.firestore.CollectionReference, sortOrder: SortDirection) {
    if (sortOrder) {
      return ref.orderBy(EPISODE_SORT, sortOrder);
    }
    return ref;
  }

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

  private getOneFromList<T>(list: T[] | T, getFirst: boolean): T {
    if (list && Array.isArray(list)) {
      return getFirst ? list[0] : list[list.length - 1];
    }
    return list;
  }

  /**
   * Fetch films collection from firestore.
   */
  // private fetchFilms(): Observable<Film[]> {
  //   return this.firestore.collection<FilmDto>(COLLECTION_KEY).valueChanges()
  //     .pipe(
  //       catchError(this.handleError<Film[]>('fetchFilms', [])),
  //       map(films => films.map(film => this.dtoToFilmModelMapper(film as FilmDto))),
  //     );
  // }

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
