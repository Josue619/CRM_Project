import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Product } from '../models/product';
import { ServiceC } from '../models/serviceC';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private headers = new HttpHeaders();
  private baseProductUrl = 'http://localhost:3000/api/product';

  public service: any = [];
  public id_Client: number;
  public products: any = [];
  public error = [];

  constructor(
    private http: HttpClient,
    private Token: TokenService) { 
    this.headers = this.headers.append('auth_token', this.Token.get());
  }

  getProducts(): Observable<Product> {
    return this.http.get(`${this.baseProductUrl}/products`, {headers: this.headers});
  }

  getClientServices(id: string): Observable<ServiceC> {
    return this.http.get(`${this.baseProductUrl}/services/${id}`, {headers: this.headers});
  }

  searchProducts(data): Observable<Product> {
    return this.http.post(`${this.baseProductUrl}/serarch`, data, {headers: this.headers});
  }

  addServices(id: number, data) {
    return this.http.post(`${this.baseProductUrl}/services/${id}`, data, {headers: this.headers});
  }

  searchServices(data): Observable<ServiceC> {
    return this.http.post(`${this.baseProductUrl}/serarchS`, data, {headers: this.headers});
  }

}
