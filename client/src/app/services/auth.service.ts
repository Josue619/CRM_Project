import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth';
  private authSubject = new BehaviorSubject(false);
  private token: string; 

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<JwtResponse> {

    return this.http.post<JwtResponse>(`${this.baseUrl}/signup`,
    user).pipe(tap(
      (res: JwtResponse) => {
        if (res) {
          // save token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        }
      }
    ))

  }

  signin(data) {
    
    return this.http.post(`${this.baseUrl}/signin`, data);

  }

  //return this.http.post(`${this.baseUrl}/signin`, data);

  logout() {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");  
  }

  private saveToken(token: string, expiresIn): void {
    this.token = token;
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  handle(token) {
    this.set(token);
  }

  set(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }


}
