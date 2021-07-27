import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Film } from '../core/models/film';
import { FilmsService } from '../core/services/films.service';
import { Observable } from 'rxjs';

/** Component for details page film. */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {

  /** Current film. */
  public readonly film$: Observable<Film>;

  /** @constructor */
  public constructor(
    private readonly route: ActivatedRoute,
    private readonly filmService: FilmsService,
    private readonly location: Location,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.film$ = this.filmService.getFilm(id);
  }

  /** Event handler for go back button. */
  public onBackClick(): void {
    this.location.back();
  }
}
