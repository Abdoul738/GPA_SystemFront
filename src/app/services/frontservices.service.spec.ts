import { TestBed } from '@angular/core/testing';

import { FrontservicesService } from './frontservices.service';

describe('FrontservicesService', () => {
  let service: FrontservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
