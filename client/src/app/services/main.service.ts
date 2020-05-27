import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';


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

  getClients(): Observable<User> {
    return this.http.get(`${this.baseUrl}/clients`, {headers: this.headers});
  }

  searchClients(data): Observable<User> {
    return this.http.post(`${this.baseUrl}/serarchClient`, data, {headers: this.headers});
  }

  getClient(id: string): Observable<User> {
    return this.http.get(`${this.baseUrl}/client/${id}`, {headers: this.headers});
  }

  updateClient(id: string|number, user: User): Observable<User> {
    return this.http.put(`${this.baseUrl}/clients/${id}`, user, {headers: this.headers});
  }

  deleteClient(id: string|number, user: User): Observable<User> {
    return this.http.put(`${this.baseUrl}/client/${id}`, user, {headers: this.headers});
  }

}
