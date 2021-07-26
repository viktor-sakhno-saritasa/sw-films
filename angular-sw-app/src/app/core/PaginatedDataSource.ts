// import { DataSource } from "@angular/cdk/collections";

// /** Simple interface for Material DataSource. */
// export interface SimpleDataSource<T> extends DataSource<T> {
//   connect(): Observable<T[]>;
//   disconnect(): void;
// }

// import { BehaviorSubject, Observable, Subject } from 'rxjs'
// import { switchMap, startWith, map, shareReplay } from 'rxjs/operators';
// import { Page, Sort, PaginationEndpoint } from './page';

// export class PaginationDataSource<T> implements SimpleDataSource<T> {
//   private pageNumber = new Subject<number>();
//   private sort: BehaviorSubject<Sort<T>>;

//   public page$: Observable<Page<T>>;

//   constructor(
//     endpoint: PaginationEndpoint<T>,
//     initialSort: Sort<T>,
//     size = 20) {
//       this.sort = new BehaviorSubject<Sort<T>>(initialSort)
//       this.page$ = this.sort.pipe(
//         switchMap(sort => this.pageNumber.pipe(
//           startWith(0),
//           switchMap(page => endpoint({page, sort, size}))
//         )),
//         shareReplay(1)
//       )
//   }

//   sortBy(sort: Partial<Sort<T>>): void {
//     const lastSort = this.sort.getValue()
//     const nextSort = {...lastSort, ...sort}
//     this.sort.next(nextSort)
//   }

//   fetch(page: number): void {
//     this.pageNumber.next(page);
//   }

//   connect(): Observable<T[]> {
//     return this.page$.pipe(map(page => page.content));
//   }

//   disconnect(): void {}

// }
