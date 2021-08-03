import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RelatedStarhips, RelatedVehicles, RelatedWithName } from '../core/models/film-form-data';

import { FilmsService } from '../core/services/films.service';

/** Add form component. */
@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFilmComponent implements OnDestroy {
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

  /** Loading$ state. */
  public readonly loading$: Observable<boolean>;

  /** Add form group. */
  public readonly addForm: FormGroup;

  /** Loading$ subject change loading$ state. */
  private readonly _loading$: BehaviorSubject<boolean>;

  /** Subject for destroy all subscribes. */
  private readonly destroy = new Subject<void>();

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly route: Router,
  ) {

    this._loading$ = new BehaviorSubject<boolean>(false);
    this.loading$ = this._loading$.asObservable();

    this.characters$ = filmsService.getRelatedInfoWithName([], 'people', true);
    this.planets$ = filmsService.getRelatedInfoWithName([], 'planets', true);
    this.species$ = filmsService.getRelatedInfoWithName([], 'species', true);
    this.starships$ = filmsService.getRelatedStarships([], 'starships', true);
    this.vehicles$ = filmsService.getRelatedVehicle([], 'vehicles', true);

    this.addForm = new FormGroup({
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
  public onSubmit(): void {
    if (this.addForm.invalid) {
      return;
    }

    this._loading$.next(true);

    this.filmsService.addFilm((this.addForm.value))
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this._loading$.next(false);
        this.route.navigate(['/']);
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
