import { TestBed, inject } from '@angular/core/testing';

import { vendorAuthService } from './vendorauth.service';

describe('VendorauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [vendorAuthService]
    });
  });

  it('should be created', inject([vendorAuthService], (service: vendorAuthService) => {
    expect(service).toBeTruthy();
  }));
});
