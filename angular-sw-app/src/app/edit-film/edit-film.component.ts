import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Film } from '../core/models/film';
import { RelatedStarhips, RelatedVehicles, RelatedWithName } from '../core/models/film-dto';
import { FilmsService } from '../core/services/films.service';

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
  public readonly characters$: Observable<RelatedWithName[]>;

  /** Planets state. */
  public readonly planets$: Observable<RelatedWithName[]>;

  /** Species state. */
  public readonly species$: Observable<RelatedWithName[]>;

  /** Starship state. */
  public readonly starships$: Observable<RelatedStarhips[]>;

  /** Vehicles state. */
  public readonly vehicles$: Observable<RelatedVehicles[]>;

  /** Loading state. */
  public readonly loading$: Observable<boolean>;

  /** Edit form group. */
  public readonly editForm: FormGroup;

  /** Loading subject change loading state. */
  private readonly loading: BehaviorSubject<boolean>;

  /** Subject for destroy all subscribes. */
  private readonly destroy = new Subject<void>();


  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly filmsService: FilmsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {

    this.loading = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loading.asObservable();

    this.currentFilm$ = filmsService.getFilm(Number(this.route.snapshot.paramMap.get('id')));

    this.characters$ = filmsService.getRelatedInfoWithName([], 'people', true);
    this.planets$ = filmsService.getRelatedInfoWithName([], 'planets', true);
    this.species$ = filmsService.getRelatedInfoWithName([], 'species', true);
    this.starships$ = filmsService.getRelatedStarships([], 'starships', true);
    this.vehicles$ = filmsService.getRelatedVehicle([], 'vehicles', true);

    this.editForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      director: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      producer: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      releaseDate: new FormControl(null, [Validators.required]),
      characters: new FormControl([], [Validators.required]),
      planets: new FormControl([], [Validators.required]),
      species: new FormControl([], [Validators.required]),
      starships: new FormControl([], [Validators.required]),
      vehicles: new FormControl([], [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.currentFilm$
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(film => {
      this.editForm.patchValue({
        ...film,
        releaseDate: `${film?.releaseDate.toISOString().split('T')[0]}`,
      });
    });
  }

  /** On Submit button handler. */
  public onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.loading.next(true);

    this.filmsService.update(Number(this.route.snapshot.paramMap.get('id')), this.editForm.value)
      .subscribe(() => {
        this.loading.next(false);
        this.router.navigate(['/']);
      });
  }

  /**
   * Function for ngForTrackBy.
   * @param index Index of list item.
   * @param item Entity.
   * @returns Primary key of entity.
   */
  public trackByFn(index: number, item: RelatedVehicles | RelatedStarhips | RelatedWithName): number {
    return item.pk;
  }
}
