import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private headers = new HttpHeaders();
  private baseProductUrl = 'http://localhost:3000/api/product';

  constructor(
    private http: HttpClient,
    private Token: TokenService) { 
    this.headers = this.headers.append('auth_token', this.Token.get());
  }

  getProducts(): Observable<Product> {
    return this.http.get(`${this.baseProductUrl}/products`, {headers: this.headers});
  }

  searchProducts(data): Observable<Product> {
    return this.http.post(`${this.baseProductUrl}/serarch`, data, {headers: this.headers});
  }

}
