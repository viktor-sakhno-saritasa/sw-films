import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Collections } from '../core/collections';
import { Film } from '../core/models/film';
import { RelatedData } from '../core/models/film-form-data';
import { indicate } from '../core/operators';
import { FilmsService } from '../core/services/films.service';
import { transformDate } from '../core/utils';

/** Edit form page component. */
@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss'],
})
export class EditFilmComponent implements OnInit, OnDestroy {

  /** Current film for update. */
  public readonly currentFilm$: Observable<Film | null>;

  /** Characters state. */
  public readonly characters$: Observable<RelatedData[]>;

  /** Planets state. */
  public readonly planets$: Observable<RelatedData[]>;

  /** Species state. */
  public readonly species$: Observable<RelatedData[]>;

  /** Starship state. */
  public readonly starships$: Observable<RelatedData[]>;

  /** Vehicles state. */
  public readonly vehicles$: Observable<RelatedData[]>;

  /** Loading state. */
  public readonly loading$: Observable<boolean>;

  /** Edit form group. */
  public readonly editForm: FormGroup;

  /** Loading subject change loading state. */
  private readonly _loading$: BehaviorSubject<boolean>;

  /** Subject for destroy all subscribes. */
  private readonly destroy$ = new Subject<void>();


  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly filmsService: FilmsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {

    this._loading$ = new BehaviorSubject<boolean>(false);
    this.loading$ = this._loading$.asObservable();

    this.currentFilm$ = filmsService.getFilm(Number(this.route.snapshot.paramMap.get('id')));

    this.characters$ = filmsService.getRelatedEntities(Collections.Characters);
    this.planets$ = filmsService.getRelatedEntities(Collections.Planets);
    this.species$ = filmsService.getRelatedEntities(Collections.Species);
    this.starships$ = filmsService.getRelatedEntities(Collections.Starships);
    this.vehicles$ = filmsService.getRelatedEntities(Collections.Vehicles);

    this.editForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      director: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      producer: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      releaseDate: [null, [Validators.required]],
      characters: [[], [Validators.required]],
      planets: [[], [Validators.required]],
      species: [[], [Validators.required]],
      starships: [[], [Validators.required]],
      vehicles: [[], [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.currentFilm$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(film => {
      this.editForm.patchValue({
        ...film,
        releaseDate: transformDate(film?.releaseDate),
      });
    });
  }

  /** On Submit button handler. */
  public onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.filmsService.update(Number(this.route.snapshot.paramMap.get('id')), this.editForm.value)
      .pipe(
        indicate(this._loading$),
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  /**
   * Function for ngForTrackBy.
   * @param index Index of list item.
   * @param item Entity.
   * @returns Primary key of entity.
   */
  public trackByFn(index: number, item: RelatedData): number {
    return item.pk;
  }
}
