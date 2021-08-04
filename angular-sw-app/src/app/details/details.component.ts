import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DetailedFilm } from '../core/models/film';
import { FilmsService } from '../core/services/films.service';

/** Component for details page film. */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, OnDestroy {

  /** Current film. */
  public readonly film$: Observable<DetailedFilm>;

  /** Subject for unsubscribe. */
  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly filmsService: FilmsService,
    private readonly location: Location,
    private readonly router: Router,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.film$ = this.filmsService.getFilmWithRelated(id);
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.film$.pipe(takeUntil(this.destroy$)).subscribe(film => {
      if (film) {
        return;
      }
      this.router.navigate(['/']);
    });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Event handler for go back button. */
  public onBackClick(): void {
    this.location.back();
  }
}
