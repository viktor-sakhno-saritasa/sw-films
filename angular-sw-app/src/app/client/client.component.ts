import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Film } from '../core/models/film';

import { FilmsService } from '../core/services/films.service';

/**
 * Main page component.
 */
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnInit, AfterViewInit {

  /** MatSort from html template. */
  @ViewChild(MatSort) public sort!: MatSort;

  /** MatPaginator from html template. */
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  /** Columns of the table. */
  public readonly displayedColumns: string[] = ['episodeId', 'title', 'director', 'releaseDate'];

  /** Data source object. */
  public dataSource!: MatTableDataSource<Film>;


  /** Current films stream. */
  public films$: Observable<Film[]>;


  public constructor(
    private filmsService: FilmsService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.films$ = this.filmsService.getFilmsStream();
  }

  /** AfterView cycle hook. */
  /** Use detectChanges only after init data source and before init sort. */
  public ngAfterViewInit(): void {
    this.films$.subscribe(films => {
      this.dataSource = new MatTableDataSource(films);

      this.changeDetector.detectChanges();

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /** Init cycle hook. */
  public ngOnInit(): void {
    /** After load films init data source and sort with paginator. */

  }

  /**
   * Search filter on the front-side.
   * @param event Event of search.
   */
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
