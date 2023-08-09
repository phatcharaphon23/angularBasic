import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  public userinfo:any;
  constructor(private router: Router) {}

  isLogin: boolean = localStorage.getItem('token') ? true : false;
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
    if (!this.isLogin) {
      this.router.navigate(['/login'], { queryParams: { retUrl: route.url } });
      return false;
    } else {
      return true;
    }
  }
  
}
