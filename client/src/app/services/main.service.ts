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
  private baseAuthUrl = 'http://localhost:3000/api/auth';
  private baseUserUrl = 'http://localhost:3000/api/user';

  public edit: boolean = false;
  public form: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    card_id: 0,
    code_phone: 0,
    phone: 0,
    roll: '',
    state: true,
    created_at: new Date()
  };

  constructor(
    private http: HttpClient,
    private Token: TokenService
  ) { 
    this.headers = this.headers.append('auth_token', this.Token.get());
  }

  signin(data) {
    return this.http.post(`${this.baseAuthUrl}/signin`, data);
  }

  signup(data) {
    return this.http.post(`${this.baseAuthUrl}/signup` ,data);
  }

  addClient(data) {
    return this.http.post(`${this.baseUserUrl}/client`, data, {headers: this.headers});
  }

  getClients(): Observable<User> {
    return this.http.get(`${this.baseUserUrl}/clients`, {headers: this.headers});
  }

  searchClients(data): Observable<User> {
    return this.http.post(`${this.baseUserUrl}/serarchClient`, data, {headers: this.headers});
  }

  getClient(id: string): Observable<User> {
    return this.http.get(`${this.baseUserUrl}/client/${id}`, {headers: this.headers});
  }

  updateClient(id: string|number, user: User): Observable<User> {
    return this.http.put(`${this.baseUserUrl}/clients/${id}`, user, {headers: this.headers});
  }

  deleteClient(id: string|number, user: User): Observable<User> {
    return this.http.put(`${this.baseUserUrl}/client/${id}`, user, {headers: this.headers});
  }

}
