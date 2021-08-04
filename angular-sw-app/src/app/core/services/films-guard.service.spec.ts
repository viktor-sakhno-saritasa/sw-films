import { TestBed } from '@angular/core/testing';

import { FilmsGuardService } from './films-guard.service';

describe('FilmsGuardService', () => {
  let service: FilmsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
