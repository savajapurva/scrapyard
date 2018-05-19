import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { vendorAuthService } from '../services/vendorauth.service';

@Injectable()
export class VendorauthGuard implements CanActivate {

  redirectUrl;

  constructor(
    private router:Router,
    private vendorauthService:vendorAuthService
  ){}

  canActivate(
    router:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ) {


      this.redirectUrl=state.url;
      this.router.navigate(['/vendorlogin']);
      return false;

  }
}
