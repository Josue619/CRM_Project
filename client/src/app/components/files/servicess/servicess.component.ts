import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserComponent } from '../../users/user/user.component';

@Component({
  selector: 'app-servicess',
  templateUrl: './servicess.component.html',
  styleUrls: ['./servicess.component.css']
})
export class ServicessComponent implements OnInit {

  public productsUser: Product[] = [];
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
    //console.log(this.Service.id_Client); 
    //console.log(this.productsUser);
    this.addServices();
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

  addServices() {
    return this.Service.addServices(this.productsUser).subscribe(
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error[0]);
  }

}
