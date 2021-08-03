import { TestBed } from '@angular/core/testing';

import { FirestoreFilmApiService } from './firestore-film-api.service';

describe('FirestoreFilmApiService', () => {
  let service: FirestoreFilmApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreFilmApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
