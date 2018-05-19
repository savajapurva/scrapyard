import { Injectable }  from '@angular/core';
import { CanActivate, Router}  from '@angular/router';
import { AuthService } from '../services/auth.service';
import { vendorAuthService } from '../services/vendorauth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private router:Router,
    private authService:AuthService,
    private vendorauthService:vendorAuthService
  ){}

  canActivate() {

      this.router.navigate(['/'])
      return false;
    }
  

}
