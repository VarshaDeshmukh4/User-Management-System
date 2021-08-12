import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../model/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  apiUrl = "http://localhost:3000/Loginuser";
  headers = new HttpHeaders().set("Content-Type", "application/json");
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }
  getUserDetails(id): Observable<any> {
    return this.http.get(this.apiUrl + "/" + id);
  }
  createUser(userBody): Observable<User> {
    return this.http.post<User>(this.apiUrl, userBody);
  }
  deleteUser(userId): Observable<User> {
    return this.http.delete<User>(this.apiUrl + "/" + userId);
  }
  getUserUpdate(id, data): Observable<any> {
    const API_URL = `${this.apiUrl}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers });
  }
}
