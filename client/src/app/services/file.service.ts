import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { Observable } from 'rxjs';
import { RequestC } from '../models/requestC';
import { NeedC } from '../models/needC';


@Injectable({
  providedIn: 'root'
})

export class FileService {

  private headers = new HttpHeaders();
  private baseFileUrl = 'http://localhost:3000/api/file';

  public requests: any = [];
  public needs: any = [];
  public id_Client: number;
  public error = [];

  public edit: boolean = false;
  public need: NeedC = {
    id: 0,
    id_Client: null,
    future_needs: null,
    f_future_needs: new Date(),
    created_at: new Date()
  };

  constructor(
    private http: HttpClient,
    private Token: TokenService) {
    this.headers = this.headers.append('auth_token', this.Token.get());
  }

  getRequests(id: string): Observable<RequestC> {
    return this.http.get(`${this.baseFileUrl}/requests/${id}`, {headers: this.headers});
  }

  getRequest(id: string): Observable<RequestC> {
    return this.http.get(`${this.baseFileUrl}/request/${id}`, {headers: this.headers});
  }

  updateRequest(id: string|number, req: RequestC): Observable<RequestC> {
    return this.http.put(`${this.baseFileUrl}/requests/${id}`, req, {headers: this.headers});
  }

  deleteRequest(id: string|number, req: RequestC): Observable<RequestC> {
    return this.http.put(`${this.baseFileUrl}/request/${id}`, req, {headers: this.headers});
  }

  searchRequest(data): Observable<RequestC> {
    return this.http.post(`${this.baseFileUrl}/serarch`, data, {headers: this.headers});
  }

  getNeedsClient(id: string): Observable<NeedC> {
    return this.http.get(`${this.baseFileUrl}/needs/${id}`, {headers: this.headers});
  }

  searchNeeds(data): Observable<NeedC> {
    return this.http.post(`${this.baseFileUrl}/serarchN`, data, {headers: this.headers});
  }

  addNeed(data): Observable<NeedC> {
    return this.http.post(`${this.baseFileUrl}/need`, data, {headers: this.headers});
  }

  updateNeed(id: string|number, need: NeedC): Observable<NeedC> {
    return this.http.put(`${this.baseFileUrl}/need/${id}`, need, {headers: this.headers});
  }

  deleteNeed(id: string|number, need: NeedC) {
    const httpOptions = {
      headers: this.headers,
      body: need
    };

    return this.http.delete(`${this.baseFileUrl}/need/${id}`, httpOptions);
  }

}
