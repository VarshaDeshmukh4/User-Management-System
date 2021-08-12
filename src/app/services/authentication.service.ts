import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
export const userRole = 'userRole';
export const userName = 'userName';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userList: any = 'http://localhost:3000/Loginuser';
  User: User;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient, private route: Router) { }

  login(): Observable<User>{
    return this.http.get<User>('http://localhost:3000/Loginuser');
  }

  setUserRole(type): void {
  localStorage.setItem(userRole, type);
  }

  setUserName(name): void {
  localStorage.setItem(userName, name);
  }

  logout(){
  this.route.navigate(['']);
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  }

}
