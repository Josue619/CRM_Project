import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private headers = new HttpHeaders();
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private Token: TokenService
  ) { 
    this.headers = this.headers.append('auth_token', this.Token.get());
  }

  signin(data) {
    console.log(`${this.baseUrl}/signin`)
    return this.http.post(`${this.baseUrl}/signin`, data);
  }

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup` ,data);
  }

  addClient(data) {
    return this.http.post(`${this.baseUrl}/client`, data, {headers: this.headers});
  }

}
