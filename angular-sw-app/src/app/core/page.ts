import { Observable } from "rxjs";


export interface Sort {
  property: 'fields.episode_id' | 'fields.title';
  order: 'asc' | 'desc';
}

export interface PageRequest<T> {
  page: number;
  size: number;
  sort: Sort;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
}

export type PaginationEndpoint<T> = (req: PageRequest<T>) => Observable<Page<T>>;
