import { Observable } from "rxjs";


export interface Sort {
  property: 'fields.episode_id' | 'fields.title';
  order: 'asc' | 'desc';
}

export interface PageRequest {
  page: number;
  size: number;
  sort: Sort;
  direction: 'next' | 'prev' | '';
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
  direction: 'next' | 'prev' | '';
}

export type PaginatedEndpoint<T, Q> = (req: PageRequest, query: Q) => Observable<Page<T>>;
