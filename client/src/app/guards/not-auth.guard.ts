import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  token: string;
  constructor(
    private router: Router,
    private sharedService: SharedService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.token = this.sharedService.getLocalStorage('token');
    if (this.token) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
