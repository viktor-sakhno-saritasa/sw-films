import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DetailedFilm, Film } from '../core/models/film';
import { RelatedStarhips, RelatedVehicles, RelatedWithName } from '../core/models/film-dto';
import { FilmsService } from '../core/services/films.service';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {

  public readonly editForm: FormGroup;
  private readonly loading: BehaviorSubject<boolean>;
  public readonly loading$: Observable<boolean>;

  public readonly currentFilm$: Observable<Film | null>;

  public readonly characters$: Observable<RelatedWithName[]>;
  public readonly planets$: Observable<RelatedWithName[]>;
  public readonly species$: Observable<RelatedWithName[]>;
  public readonly starships$: Observable<RelatedStarhips[]>;
  public readonly vehicles$: Observable<RelatedVehicles[]>;


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly filmsService: FilmsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
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
    })
  }

  public ngOnInit(): void {
    this.currentFilm$.subscribe(film => {
      this.editForm.patchValue({
        ...film,
        releaseDate: `${film?.releaseDate.toISOString().split('T')[0]}`
      })
    })
  }


  public onSubmit(): void {
    if(this.editForm.invalid) {
      return;
    }

    this.loading.next(true);

    this.filmsService.update(Number(this.route.snapshot.paramMap.get('id')), this.editForm.value)
      .subscribe(() => {
        this.loading.next(false);
        this.router.navigate(['/'])
      });
  }

}
