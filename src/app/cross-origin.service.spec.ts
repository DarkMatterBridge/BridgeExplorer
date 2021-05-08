import { TestBed } from '@angular/core/testing';

import { CrossOriginService } from './cross-origin.service';

describe('CrossOriginService', () => {
  let service: CrossOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
