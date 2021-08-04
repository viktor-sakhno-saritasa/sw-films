import { Observable } from 'rxjs';

import { DetailedFilm, Film } from '../models/film';
import { FilmFormData, RelatedData } from '../models/film-form-data';
import { Page, PageRequest, RequestDocuments } from '../page';

import { FilmQuery } from './films.service';

/** Common interface that need to implement any api service to work. */
export interface FilmApiService {

  /** Add film to the store. */
  add(data: FilmFormData): Observable<void>;

  /** Update film in the store. */
  update(id: number, data: FilmFormData): Observable<void>;

  /** Delete film from the store. */
  delete(id: number): Observable<void>;

  /** Get film by episode id from the store. */
  getPreviewByEpisodeId(id: number): Observable<Film | null>;

  /** Get film by episode id with related entities from the store. */
  getFullByEpisodeId(id: number): Observable<DetailedFilm>;

  /** Get related data of the film by ids from the store. */
  getRelatedEntities(collection: string, ids?: readonly number[]): Observable<RelatedData[]>;

  /** Get full collection as observable. */
  getFilmCollection(): Observable<Film[]>;

  /** Get page for pagination. */
  getPage(request: PageRequest, query: FilmQuery, documents: RequestDocuments): Observable<Page<Film>>;
}
