import { FilmService } from './../../../../vanila-sw-app/src/services/film.service';
// import { catchError, finalize, map } from 'rxjs/operators';
// import { BehaviorSubject, observable, Observable, of, Subscription } from "rxjs";
// import { Film } from "./models/film";

import { SortDirection } from "@angular/material/sort";
import { Observable, Subject, BehaviorSubject, combineLatest, of, Subscription } from "rxjs";
import { catchError, share, switchMap, tap } from "rxjs/operators";
import { FilmDto } from "./models/film-dto";
import { FilmsService } from './services/films.service';
import { Film } from './models/film';

import firebase from 'firebase/app';

// import firebase from "firebase/app";
// import { FilmsService } from "./services/films.service";
// import { SortDirection } from '@angular/material/sort';
// import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';

/** Class for user table with data source. */
@Injectable({
  providedIn: 'root',
})
export class FilmsDataSource extends DataSource<Film> {

  /** Subscribers will always get its latest emitted value. */
  // private filmsSubject = new BehaviorSubject<Film[]>([]);

  /** For emit values in loaded$ observable for use it in html. */
  private loadingSubject = new BehaviorSubject<boolean>(false);

  private requestSubject: BehaviorSubject<Query>;
  public films$: Observable<Film[]>;

  // public films$ = this.filmsSubject.asObservable();

  /** For subscribe for the changes loading state. */
  public loading$ = this.loadingSubject.asObservable();

  public size$ = this.filmsService.getSize();

  // public films$ = new Observable<Film[]>();

  // private subscriptions = new Subscription();

  /** Size of collection for pagination. */
  // public size$ = this.filmsService.getSize();

  /**
   * Inject dependencies.
   * @param filmsService Service for fetch films data.
   */
  public constructor(private filmsService: FilmsService) {
    super();

    this.requestSubject = new BehaviorSubject<Query>({} as Query);

    this.films$ = this.requestSubject.pipe(
      tap((query) => console.log('hello', query)),
      switchMap(query => this.filmsService.getFilms(query?.filter, query?.sortOrder, query?.direction)
      .pipe(
        tap(films => console.log('films', films)),
        tap(() => {
          if (!query.filter) {
            this.loadingSubject.next(false)
          }
        }),
      )),
    )
  }

  /**
   * This method will be called once by the Data Table at table bootstrap time.
   * @param collectionViewer Provides an Observable that emits information about
   * what data is being displayed (the start index and the end index).
   * @returns The Data Table expects this method to return an Observable, and the values
   * of that observable contain the data that the Data Table needs to display.
   */
  public connect(collectionViewer: CollectionViewer): Observable<Film[]> {
    // super.connect(collectionViewer);
    console.log('CONNECT')
    return this.films$;
    // return this.filmsSubject.asObservable();
  }

  /**
   * This method is called once by the data table at component destruction time.
   * In this method, we are going to complete any observables that we have created
   * internally in this class, in order to avoid memory leaks.
   * @param collectionViewer Provides an Observable that emits information about
   * what data is being displayed (the start index and the end index).
   */
  public disconnect(collectionViewer: CollectionViewer): void {
    // this.subscriptions.unsubscribe();
    // this.filmsSubject.complete();
    // this.loadingSubject.complete();


    console.log('COMPLETE');
  }

  /**
   * This method is going to be called in response to multiple user actions
   * (pagination, sorting, filtering) to load a given data page.
   * @param filter This is a search string that will help us filter the results.
   * If we pass the empty string '' it means that no filtering is done on the server.
   * @param sortOrder We can specify is the sort order is ascending (which is the default asc value),
   * or descending by passing the value desc.
   * @param direction Direction lets you know what user want: previous page or next page.
   */
  public loadFilms(
    filter = '',
    sortOrder: 'asc' | 'desc' = 'asc',
    direction?: string,
  ): void {

    this.loadingSubject.next(true);

    const query: Query = {
      filter,
      sortOrder,
      direction,
    }

    this.requestSubject.next(query);
    console.log('tick')

    console.log(this.requestSubject);

    // this.loadingSubject.next(true);

    // const observable$ = this.filmsService.getFilms(filter, sortOrder, direction)
    //   .pipe(
    //     catchError(() => of([])),
    //   );

    // console.log('REQUEST', this.subscriptions);


    // this.subscriptions.add(observable$.subscribe(films => {
    //   console.log(this.filmsSubject);
    //   this.filmsSubject.next(films);
    //   this.loadingSubject.next(false)
    //   console.log('SUBSCRIPTION', this.subscriptions);
    //   console.log("REQUEST")
    //   console.log(films);
    // }));
  }
}

export interface Query {
  filter?: string,
  sortOrder: 'asc' | 'desc',
  direction?: string,
}

// export interface Sort {
//   property: 'fields.episode_id';
//   order: SortDirection;
// }

// export interface SimpleDataSource<T> extends DataSource<T> {
//   connect(): Observable<T[]>;
//   disconnect(): void;
// }

// export class PaginatedDataSource<T, Q> implements SimpleDataSource<T> {
//   // private sort: BehaviorSubject<Sort>;
//   // private query: BehaviorSubject<Q>;
//   private loading = new Subject<boolean>();

//   public loading$ = this.loading.asObservable();
//   public films$: Observable<Film[]> = of([]);

//   // initialSort: Sort, initialQuery: Q, public pageSize = 3
//   public constructor(private filmsService: FilmsService) {
//     // this.query = new BehaviorSubject<Q>(initialQuery);
//     // this.sort = new BehaviorSubject<Sort>(initialSort);

//     // const param$ = combineLatest([this.query, this.sort]);


//   }

//   fetch(
//     filter?: string,
//     sortOrder?: SortDirection,
//     direction?: string,
//   ) : void {

//     this.films$ = this.filmsService.getFilms(filter, sortOrder, direction)
//       .pipe(
//         catchError(() => of([])),
//         switchMap()
//       );
//   }



//   disconnect(): void {}
// }
