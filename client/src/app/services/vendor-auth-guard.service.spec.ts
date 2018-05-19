import { TestBed, inject } from '@angular/core/testing';

import { VendorAuthGuardService } from './vendor-auth-guard.service';

describe('VendorAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorAuthGuardService]
    });
  });

  it('should be created', inject([VendorAuthGuardService], (service: VendorAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
