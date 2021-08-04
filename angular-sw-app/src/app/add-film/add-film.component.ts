import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Collections } from '../core/collections';
import { RelatedData } from '../core/models/film-form-data';
import { indicate } from '../core/operators';
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
  public readonly characters$: Observable<RelatedData[]>;

  /** Planets state. */
  public readonly planets$: Observable<RelatedData[]>;

  /** Species state. */
  public readonly species$: Observable<RelatedData[]>;

  /** Starship state. */
  public readonly starships$: Observable<RelatedData[]>;

  /** Vehicles state. */
  public readonly vehicles$: Observable<RelatedData[]>;

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
    private readonly formBuilder: FormBuilder,
  ) {

    this._loading$ = new BehaviorSubject<boolean>(false);
    this.loading$ = this._loading$.asObservable();

    this.characters$ = filmsService.getRelatedEntities(Collections.Characters);
    this.planets$ = filmsService.getRelatedEntities(Collections.Planets);
    this.species$ = filmsService.getRelatedEntities(Collections.Species);
    this.starships$ = filmsService.getRelatedEntities(Collections.Starships);
    this.vehicles$ = filmsService.getRelatedEntities(Collections.Vehicles);

    this.addForm = formBuilder.group({
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
    this.destroy.next();
    this.destroy.complete();
  }

  /** @inheritdoc */
  public onSubmit(): void {
    if (this.addForm.invalid) {
      return;
    }

    this.filmsService.addFilm((this.addForm.value))
      .pipe(
        takeUntil(this.destroy),
        indicate(this._loading$),
      )
      .subscribe(() => {
        this.route.navigate(['/']);
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
