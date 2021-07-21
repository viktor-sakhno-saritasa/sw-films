import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class ClientComponent implements OnInit {

  /** Current films stream. */
  public films$: Observable<Film[]>;

  public constructor(private filmsService: FilmsService) {
    this.films$ = this.filmsService.getFilmsStream();
  }

  /** Init component. */
  public ngOnInit(): void {
    /** Init component. */
  }

}
