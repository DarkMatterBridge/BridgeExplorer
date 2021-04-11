import { TestBed } from '@angular/core/testing';

import { LinParserService } from './lin-parser.service';

describe('LinParserService', () => {
  let service: LinParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
