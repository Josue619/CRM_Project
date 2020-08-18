import { Injectable } from '@angular/core';
import { RequestC } from '../models/requestC';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BinnacleService {

  public attended = false;
  public id_Client: number;

  private headers = new HttpHeaders();
  private baseBinnacleUrl = 'http://localhost:3000/api/binnacle';

  public requests: any = [];

  constructor(private http: HttpClient, private Token: TokenService) { 
    this.headers = this.headers.append('auth_token', this.Token.get());
  }

  getBinnacles(): Observable<any> {
    return this.http.get(`${this.baseBinnacleUrl}/binnacles`, {headers: this.headers});
  }

  searchRequest(data): Observable<RequestC> {
    return this.http.post(`${this.baseBinnacleUrl}/serarch`, data, {headers: this.headers});
  }

  getRequests(id: string): Observable<RequestC> {
    return this.http.get(`${this.baseBinnacleUrl}/requests/${id}`, {headers: this.headers});
  }

  searchRequestCheck(data): Observable<RequestC> {
    return this.http.post(`${this.baseBinnacleUrl}/serarchCheck`, data, {headers: this.headers});
  }

  getRequestsCheck(id: string): Observable<RequestC> {
    return this.http.get(`${this.baseBinnacleUrl}/requestsCheck/${id}`, {headers: this.headers});
  }

  addBinnacles(data) {
    return this.http.post(`${this.baseBinnacleUrl}/binnacles`, data, {headers: this.headers});
  }

  searchBinnacles(data): Observable<any> {
    return this.http.post(`${this.baseBinnacleUrl}/serarchBinnacles`, data, {headers: this.headers});
  }

  deleteBinnacle(id: string|number, binnacle: any): Observable<any> {
    return this.http.put(`${this.baseBinnacleUrl}/binnacle/${id}`, binnacle, {headers: this.headers});
  }
}
