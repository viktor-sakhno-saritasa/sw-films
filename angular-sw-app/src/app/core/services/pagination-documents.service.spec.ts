import { TestBed } from '@angular/core/testing';

import { PaginationDocumentsService } from './pagination-documents.service';

describe('PaginationDocumentsService', () => {
  let service: PaginationDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
