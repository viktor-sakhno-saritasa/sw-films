import { ChangeDetectionStrategy, Component} from '@angular/core';
import { Film } from '../core/models/film';
import { FilmQuery, FilmsService } from '../core/services/films.service';
import { PaginatedDataSource } from '../core/PaginatedDataSource';

/** Main page component. */
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {

  /** Columns of the table. */
  public readonly displayedColumns: readonly string[] = ['episodeId', 'title', 'releaseDate', 'actions'];

  /** Data for data source. */
  public readonly data: PaginatedDataSource<Film, FilmQuery>;

  /** @constructor */
  public constructor(private readonly filmsService: FilmsService) {
    this.data = new PaginatedDataSource<Film, FilmQuery> (
      (request, query) => this.filmsService.page(request, query),
      {property: 'fields.episode_id', order: 'asc'},
      {search: ''},
      3,
    )
  }
}
