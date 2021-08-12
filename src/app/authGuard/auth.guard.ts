import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {

return this.checkLoginIn(state.url);
}
checkLoginIn(url:string):boolean{
  const userRole = localStorage.getItem('userRole');
  if (!userRole) {
    alert('please login to access this page.');
    this.router.navigate(['']);
  }
  return true;
}

}
