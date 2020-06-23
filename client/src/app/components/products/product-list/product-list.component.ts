import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public product: Product;
  public products: any = [];
  public productsUser: any = [];
  public error = [];
  public assigned = false;
  public form = {
    search: null,
    id: null,
  };

  constructor(private Service: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  add() {
    console.log(this.productsUser);
  }

  getProducts() {
    return this.Service.getProducts().subscribe(
      result => { this.products = result },
      error => this.handleError(error)
    );
  }

  searchProducts() {
    return this.Service.searchProducts(this.form).subscribe(
      result => this.loadProduct(result),
      error => this.handleError(error)
    );
  }

  loadProduct(result) {
    result.length == 0 ? this.getProducts() : this.products = result;
  }

  test(product) {
    const i =+ this.productsUser.length;
    this.product = product;
    this.productsUser[i] = this.product;
    
  }

  editMethod() {
  }

  statusDelete() {
  }

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error[0]);
  }

}
