import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ServiceC } from 'src/app/models/serviceC';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicess',
  templateUrl: './servicess.component.html',
  styleUrls: ['./servicess.component.css']
})
export class ServicessComponent implements OnInit {

  public productsUser: Product[] = [];
  public products: any = [];
  public services: ServiceC;
  public isChecked: boolean;
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor(public Service: ProductService, private router: Router) { }

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
      this.productsUser.push(this.setServices(product));
    }else {
      var i = this.productsUser.indexOf( this.setServices(product) );
      this.productsUser.splice( i, 1 );
    }
    console.log(this.isChecked);
  }

  setServices(product: Product) {
    const serv: ServiceC = new ServiceC();
    serv.id_Client = this.Service.id_Client; 
    serv.id_Product = product.id;
    serv.code = product.code;
    serv.fullname = product.fullname;
    serv.state = true;
    
    return serv;
  }

  addServices() {
    return this.Service.addServices(this.Service.id_Client, this.productsUser).subscribe(
      result => this.handleResponse(result),
      error => this.handleError(error)
    );
  }

  clearService() {
    //var checkbox = (<HTMLInputElement>document.getElementById("checkService"));
    //checkbox.checked = false;
    //this.ngOnInit();
    
  }

  loadService() {
    this.error;
    return this.Service.getClientServices(this.Service.id_Client.toString()).subscribe(
      result => { this.Service.service = result },
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    if (data == 'Redirect') {
      var elementClose = document.getElementById("closeProduct") as any;
      var elementCkeck = document.getElementById("checkService") as any;
      elementClose.click();
      elementCkeck.checked = false;
      this.isChecked = false;
      this.loadService();
      this.router.navigateByUrl('/file');
    }
  }
  
  handleError(error) {
    this.error = error.error.errors;
  }

}
