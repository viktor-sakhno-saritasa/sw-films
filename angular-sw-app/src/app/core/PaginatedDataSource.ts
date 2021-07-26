import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, Subject, combineLatest } from "rxjs";
import { map, share, startWith, switchMap, take, tap } from "rxjs/operators";
import { indicate } from "./operators";
import { Page, PaginatedEndpoint, Sort } from "./page";

/** Simple interface for Material DataSource. */
export interface SimpleDataSource<T> extends DataSource<T> {
  /**
   * This method will be called once by the Data Table at table bootstrap time.
   * @returns The Data Table expects this method to return an Observable, and the values
   * of that observable contain the data that the Data Table needs to display.
   */
  connect(): Observable<T[]>;
  /**
   * This method is called once by the data table at component destruction time.
   * In this method, we are going to complete any observables that we have created
   * internally in this class, in order to avoid memory leaks.
   * @param collectionViewer Provides an Observable that emits information about
   * what data is being displayed (the start index and the end index).
   */
  disconnect(): void;
}

/** Class for paginate data source. */
export class PaginatedDataSource<T, Q> implements SimpleDataSource<T> {

  /** Subject for manage current page number. */
  private readonly pageNumber = new Subject<number>();

  /** State for previous page number let know what is direction of pagination. */
  private previousPageNumber = 0;

  /** Subject for manage sort options. */
  private readonly sort: BehaviorSubject<Sort>;

  /** Subject for manage query options. */
  private readonly query: BehaviorSubject<Q>;

  /** Subject for manage loading state. */
  private readonly loading = new Subject<boolean>();

  /** Observable loading state. */
  public readonly loading$ = this.loading.asObservable();

  /** Observable for page data. */
  public readonly page$: Observable<Page<T>>;

  /** Direction of pagination to put in PageRequest. */
  private currentDirection: 'next' | 'prev' | '' = '';

  /** @constructor */
  public constructor(
    private endpoint: PaginatedEndpoint<T, Q>,
    initialSort: Sort,
    initialQuery: Q,
    public pageSize = 2) {

    this.query = new BehaviorSubject<Q>(initialQuery);
    this.sort = new BehaviorSubject<Sort>(initialSort);

    const param$ = combineLatest([this.query, this.sort]);

    this.page$ = param$.pipe(
      tap(() => {
        this.currentDirection = '';
        this.previousPageNumber = 0;
      }),
      switchMap(([query, sort]) => this.pageNumber.pipe(
        startWith(0),
        switchMap(page => this.endpoint({page, size: this.pageSize, sort, direction: this.currentDirection}, query)
          .pipe(
            take(1),
            indicate(this.loading),
          ),
        ),
      )),
      share(),
    );
  }

  /**
   * Get last sort value and change only properties with new value.
   * @param sort Data from selection change event.
   */
  public onOrderChangeClick(sort: Partial<Sort>): void {
    const lastSort = this.sort.getValue();
    const nextSort = {...lastSort, ...sort};
    this.sort.next(nextSort);
  }

  /**
   * Get last query value and change only properties with new value.
   * @param query Data from search input.
   */
  public onQueryInput(query: Partial<Q>): void {
    const lastQuery = this.query.getValue();
    const nextQuery = {...lastQuery, ...query};
    this.query.next(nextQuery);
  }

  /**
   * Fetch to the next page of the items.
   * @param page Number of page we get.
   */
  public fetch(page: number): void {
    this.currentDirection = this.defineDirection(this.previousPageNumber, page);
    this.previousPageNumber = page;
    this.pageNumber.next(page);
  }

  /** @inheritdoc */
  public connect(): Observable<T[]> {
    return this.page$.pipe(map(page => page.content));
  }

  /** @inheritdoc */
  public disconnect(): void {}

  /**
   * Define user go prev or next page.
   * Direction '' is mean that need to reset pagination.
   * @param last Previous page index.
   * @param next New page index.
   * @returns Direction of the pagination.
   */
    private defineDirection(last: number, next: number): 'next' | 'prev' | '' {
      return next > last ? 'next' : last > next ? 'prev' : '';
  }
}
