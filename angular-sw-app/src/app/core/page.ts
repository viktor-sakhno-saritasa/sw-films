import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/** Sort interface. */
export interface Sort {

  /** Properties for sort table data. */
  readonly property: 'fields.episode_id' | 'fields.title';

  /** Ascending order. */
  readonly order: 'asc' | 'desc';
}

/** Interface for state firestore documents for use pagination. */
export interface RequestDocuments {

  /** Latest  document in response for pagination. */
  latestEntryInResponse: QueryDocumentSnapshot<unknown> | null;

  /** First document in response for pagination. */
  firstEntryInResponse: QueryDocumentSnapshot<unknown> | null;

  /** First document in previous response push in the stack for previous pagination. */
  firstEntryInPrevResponseStack: QueryDocumentSnapshot<unknown>[];
}

/** Interface for page request data. */
export interface PageRequest {

  /** Page index provided mat-pagination. */
  readonly page: number;

  /** Size of elements in a page. */
  readonly size: number;

  /** Sort object. */
  readonly sort: Sort;

  /** Direction of the pagination. '' is equal reset pagination. */
  readonly direction: 'next' | 'prev' | '';
}

/** Interface for full page data. */
export interface Page<T> {

  /** Main content. */
  readonly content: T[];

  /** Total elements of films. */
  readonly totalElements: number;

  /** Size of elements in a page. */
  readonly size: number;

  /** Page index provided mat-pagination. */
  readonly number: number;

  /** Direction of the pagination. '' is equal reset pagination. */
  readonly direction: 'next' | 'prev' | '';
}

export type PaginatedEndpoint<T, Q> = (req: PageRequest, query: Q, documents: RequestDocuments) => Observable<Page<T>>;
