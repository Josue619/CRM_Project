import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../models/product';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public productsUser: any = [];
  public isChecked: boolean;
  public products: any = [];
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor(public Service: ProductService) { }

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

  changed = (evt, product) => {   
    this.isChecked = evt.target.checked;
    if (this.isChecked) {
      this.productsUser.push(product);
    }else {
      var i = this.productsUser.indexOf( product );
      this.productsUser.splice( i, 1 );
    }
    console.log(this.isChecked);
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
