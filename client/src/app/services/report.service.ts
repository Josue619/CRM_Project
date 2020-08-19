import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private headers = new HttpHeaders();
  private baseBinnacleUrl = 'http://localhost:3000/api/report';

  constructor( private http: HttpClient, private Token: TokenService ) {
    this.headers = this.headers.append('auth_token', this.Token.get());
  }

  getBinnacles(): Observable<any> {
    return this.http.get(`${this.baseBinnacleUrl}/binnacles`, {headers: this.headers});
  }

  searchBinnacles(data): Observable<any> {
    return this.http.post(`${this.baseBinnacleUrl}/serarchBinnacles`, data, {headers: this.headers});
  }

}
