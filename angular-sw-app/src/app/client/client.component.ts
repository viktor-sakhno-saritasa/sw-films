import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent, Observable, of, Subject } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

import { Film } from '../core/models/film';

/**
 * Проблема с тем, что при авторизации происходит какая то дичь.
 * Я не могу понять с чем это связано, но после перезахода и нажатии пагинации он перескакивает страницы.
 */

import { FilmQuery, FilmsService } from '../core/services/films.service';
import { UserService } from '../core/services/user.service';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { FilmsDataSource } from '../core/FilmsDataSource';
import { PageRequest, Sort } from '../core/page';
import { FilmDto } from '../core/models/film-dto';
import { PaginatedDataSource } from '../core/PaginatedDataSource';

/**
 * Main page component.
 */
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnInit, AfterViewInit, OnDestroy {

  /** MatSort from html template. */
  // @ViewChild(MatSort)
  // public sort!: MatSort;

  /** MatPaginator from html template. */
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  // @ViewChild('input') input!: ElementRef;

  private destroy: Subject<void> = new Subject<void>();

  /** Columns of the table. */
  public readonly displayedColumns: string[] = ['episodeId', 'title', 'director', 'releaseDate', 'actions'];

  public readonly displayedColumns2 = ['episodeId', 'title', 'releaseDate'];
  initialSort: Sort = {property: 'fields.episode_id', order: 'asc'};


  /** Current films stream. */
  // public films$: Observable<Film[]>;
  // public filmsSize$: Observable<number>;
  public filmsLoading$: Observable<boolean> = of(false);

  public dataSource!: FilmsDataSource;

  public data: PaginatedDataSource<Film, FilmQuery>;

  // public dataSource!: DataSource<Film>;

  public constructor(
    private filmsService: FilmsService,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private route: Router,
    // public dataSource: FilmsDataSource,
  ) {
    // this.films$ = this.filmsService.films$;
    // this.films$ = this.filmsService.getFilms();
    // this.filmsSize$ = this.filmsService.getSize();

    this.data = new PaginatedDataSource<Film, FilmQuery> (
      (request, query) => this.filmsService.page(request, query),
      this.initialSort,
      {search: ''},
      2,
    )
  }

  ngOnDestroy(): void {
    console.log('DESTORY')
    this.destroy.next();
    // this.dataSource.subscriptions.unsubscribe();
  }

  /** AfterView cycle hook. */
  /** Use detectChanges only after init data source and before init sort. */
  public ngAfterViewInit(): void {
    /** After load films init data source and sort with paginator. */

    // this.films$.subscribe(films => {
    //   this.dataSource = new MatTableDataSource(films);

    //   this.changeDetector.detectChanges();

    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });

    // fromEvent(this.input.nativeElement,'keyup')
    // .pipe(
    //     debounceTime(400),
    //     distinctUntilChanged(),
    //     tap(() => {
    //         this.paginator.pageIndex = 0;
    //         this.dataSource.loadFilms(this.input.nativeElement.value, this.sort.direction || 'asc', '');
    //     })
    // )
    // .subscribe();

    // this.sort.sortChange.subscribe(() => {
    //   this.paginator.pageIndex = 0;
    //   this.dataSource.loadFilms('', this.sort.direction || 'asc');
    // });

    // this.paginator.page
    //   .pipe(
    //     takeUntil(this.destroy),
    //     tap(paginationData => {
    //       let direction = '';

    //       if (paginationData.previousPageIndex !== undefined) {
    //         direction = paginationData.pageIndex > paginationData.previousPageIndex ? 'next'
    //           : paginationData.previousPageIndex > paginationData.pageIndex ? 'prev'
    //           : '';
    //       }

          // if (direction == '') {
          //   this.paginator.pageIndex = 0;
          // }


          // this.films$ = this.filmsService.getFilms('', '', direction);
          // console.log('SEND REQUEST 1', paginationData).subscribe(films => {

          // })

          // this.dataSource.loadFilms('', this.sort.direction || 'asc', direction);

          console.log('CHECK AFTER')
          // this.films$ = this.filmsService.getFilms('', '', direction);

        // }),
      // )
      // .subscribe();

      // console.log('AFTER VIEW INIT')
  }

  /** Init cycle hook. */
  public ngOnInit(): void {
    /** Init cycle hook. */

    this.dataSource = new FilmsDataSource(this.filmsService);
    // this.dataSource.loadFilms();
    // this.films$ = this.filmsService.getFilms();

    // console.log('SEND REQUEST 2');
    // this.dataSource.loading$.subscribe(data => console.log(data));
    // this.filmsService.getFilms().subscribe(films => console.log(films));
    // this.films$.pipe(
    //   takeUntil(this.destroy),
    // );

    // const request: PageRequest = {
    //   page: 1,
    //   size: 2,
    //   sort: {property: 'fields.episode_id', order: 'asc'},
    //   direction: '',
    // }

    // const query: FilmQuery = {search: ''};

    // this.filmsService.page(request, query).subscribe(data => console.log('PAGE', data));


    console.log('Ng ON init')

    // films$.su

    this.dataSource.loadFilms();

    // this.films$ = this.filmsService.getFilms();
  }

  private initDataSource(): void {
    // this.filmsService.getFilms().subscribe(films => this.dataSource = films);
  }

  /**
   * Search filter on the front-side.
   * @param event Event of search.
   */
  // public applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // public initDataSource() {
  //   this.filmsService.getFilms
  // }

  /** Event handler for remove button. For the next task. */
  public remove(): void {
    /** Mock for remove button. */
  }

  public next() {
    // this.films$ = this.filmsService.getFilms('', '', 'next');
  }

  public prev() {
    // this.films$ = this.filmsService.getFilms('', '', 'prev');
  }

  /**
   * Snack bar for information client about anything.
   * @param message Message text.
   * @param action Text for action.
   */
  public openSnackBar(message: string, action: string): void {
    if (this.userService.currentUser) {
      return;
    }

    this.snackBar.open(message, action);
  }

  /**
   * Navigate to film page for details.
   * If user is not logged, open snack bar for information.
   * @param id Id of current film for check details.
   */
  public getDetails(id: number): void {
    if (this.userService.currentUser) {
      this.route.navigate(['/details/', id]);
    }
    this.openSnackBar('Need to login for check details.', 'OK');
  }
}
