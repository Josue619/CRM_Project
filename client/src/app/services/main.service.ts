import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient
  ) { }

  signin(data) {
    console.log(`${this.baseUrl}/signin`)
    return this.http.post(`${this.baseUrl}/signin`, data);
  }

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

}
