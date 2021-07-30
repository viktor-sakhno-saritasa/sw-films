import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DetailedFilm } from '../core/models/film';
import { FilmsService } from '../core/services/films.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/** Component for details page film. */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {

  /** Current film. */
  public readonly film$: Observable<DetailedFilm>;

  /** @constructor */
  public constructor(
    private readonly route: ActivatedRoute,
    private readonly filmsService: FilmsService,
    private readonly location: Location,
  ) {
    this.film$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        return this.filmsService.getFilmWithRelated(id);
      })
    )
  }

  /** Event handler for go back button. */
  public onBackClick(): void {
    this.location.back();
  }
}
