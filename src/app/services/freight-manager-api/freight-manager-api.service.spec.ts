import { TestBed } from '@angular/core/testing';

import { FreightManagerAPIService } from './freight-manager-api.service';

describe('FreightManagerAPIService', () => {
  let service: FreightManagerAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreightManagerAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
