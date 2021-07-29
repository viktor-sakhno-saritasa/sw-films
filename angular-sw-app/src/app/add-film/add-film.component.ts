import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';
import { RelatedStarhips, RelatedVehicles, RelatedWithName } from '../core/models/film-dto';
import { FilmsService } from '../core/services/films.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})
export class AddFilmComponent {

  public readonly addForm: FormGroup;
  private readonly loading: BehaviorSubject<boolean>;
  public readonly loading$: Observable<boolean>;

  public readonly characters$: Observable<RelatedWithName[]>;
  public readonly planets$: Observable<RelatedWithName[]>;
  public readonly species$: Observable<RelatedWithName[]>;
  public readonly starships$: Observable<RelatedStarhips[]>;
  public readonly vehicles$: Observable<RelatedVehicles[]>;


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly filmsService: FilmsService,
  ) {

    this.loading = new BehaviorSubject<boolean>(true);
    this.loading$ = this.loading.asObservable();

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
    })
  }

  public onSubmit(): void {
    if(this.addForm.invalid) {
      return;
    }
    console.log(this.addForm.value);
  }

  private setLoading() {

  }
}
