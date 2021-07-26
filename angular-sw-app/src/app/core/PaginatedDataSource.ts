import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, Subject, combineLatest } from "rxjs";
import { debounceTime, distinctUntilChanged, distinctUntilKeyChanged, map, share, startWith, switchMap, take, tap } from "rxjs/operators";
import { indicate } from "./operators";
import { Page, PaginatedEndpoint, Sort } from "./page";

/** Simple interface for Material DataSource. */
export interface SimpleDataSource<T> extends DataSource<T> {
  connect(): Observable<T[]>;
  disconnect(): void;
}


export class PaginatedDataSource<T, Q> implements SimpleDataSource<T> {
  private pageNumber = new Subject<number>();
  private previousPageNumber = 0;
  private sort: BehaviorSubject<Sort>;
  private query: BehaviorSubject<Q>;
  private loading = new Subject<boolean>();

  public loading$ = this.loading.asObservable();
  public page$: Observable<Page<T>>;

  private currentDirection: 'next' | 'prev' | '' = '';

  constructor(
    private endpoint: PaginatedEndpoint<T, Q>,
    initialSort: Sort,
    initialQuery: Q,
    public pageSize = 2) {

    this.query = new BehaviorSubject<Q>(initialQuery);
    this.sort = new BehaviorSubject<Sort>(initialSort);

    const param$ = combineLatest([this.query.pipe(
      debounceTime(500),
      distinctUntilKeyChanged('search' as keyof Q),
    ), this.sort]);

    this.page$ = param$.pipe(
      tap(() => {
        this.currentDirection = '';
        this.previousPageNumber = 0;
      }),
      switchMap(([query, sort]) => this.pageNumber.pipe
      (
        startWith(0),
        switchMap(page => this.endpoint({page, size: this.pageSize,
          sort, direction: this.currentDirection}, query)
            .pipe(
              take(1),
              indicate(this.loading))
        )
      )),
      share(),
    );
  }

  defineDirection(last: number, next: number): 'next' | 'prev' | '' {
    return next > last ? 'next'
      : last > next ? 'prev'
      : '';
  }

  sortBy(sort: Partial<Sort>): void {
    const lastSort = this.sort.getValue();
    const nextSort = {...lastSort, ...sort};

    // this.reset();

    this.sort.next(nextSort);
  }

  queryBy(query: Partial<Q>): void {
    const lastQuery = this.query.getValue();
    const nextQuery = {...lastQuery, ...query};

    // this.reset();

    this.query.next(nextQuery);
  }

  fetch(page: number): void {
    this.currentDirection = this.defineDirection(this.previousPageNumber, page);
    this.pageNumber.next(page);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(map(page => page.content));
  }

  reset() {
    this.pageNumber.next(0);
    this.currentDirection = '';
  }

  disconnect(): void {}
}
