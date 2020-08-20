import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private headers = new HttpHeaders();
  private baseReportUrl = 'http://localhost:3000/api/report';

  constructor( private http: HttpClient, private Token: TokenService ) {
    this.headers = this.headers.append('auth_token', this.Token.get());
  }

  getBinnacles(): Observable<any> {
    return this.http.get(`${this.baseReportUrl}/binnacles`, {headers: this.headers});
  }

  searchBinnacles(data): Observable<any> {
    return this.http.post(`${this.baseReportUrl}/serarchBinnacles`, data, {headers: this.headers});
  }

  getEvents(): Observable<any> {
    return this.http.get(`${this.baseReportUrl}/events`, {headers: this.headers});
  }

  searchEvents(data): Observable<any> {
    return this.http.post(`${this.baseReportUrl}/serarchEvents`, data, {headers: this.headers});
  }

  uploadFile(data) {
    return this.http.post(`${this.baseReportUrl}/uploadReport`, data, {headers: this.headers});
    //return this.http.post(`${this.baseReportUrl}/uploadReport`, data)
    //  .toPromise()
    //  .then(res => {
    //    console.log(res);
    //    return res;
    //  })
    //  .catch();
  }

}
