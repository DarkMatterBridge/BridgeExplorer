import { TestBed } from '@angular/core/testing';

import { BridgeSystemManager } from './bridge-system-manager.service';

describe('BridgeSystemManagerService', () => {
  let service: BridgeSystemManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BridgeSystemManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
