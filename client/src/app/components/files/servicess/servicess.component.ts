import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ServiceC } from 'src/app/models/serviceC';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicess',
  templateUrl: './servicess.component.html',
  styleUrls: ['./servicess.component.css']
})
export class ServicessComponent implements OnInit {

  public services: ServiceC;
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor(public Service: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    return this.Service.getProducts().subscribe(
      result => { this.Service.products = result },
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
    result.length == 0 ? this.getProducts() : this.Service.products = result;
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

  addServices(product: Product) {
    this.services = this.setServices(product);
    
    return this.Service.addServices(this.Service.id_Client, this.services).subscribe(
      result => this.handleResponse(result),
      error => this.handleError(error)
    );
  }

  loadService() {
    return this.Service.getClientServices(this.Service.id_Client.toString()).subscribe(
      result => { this.Service.service = result },
      error => this.handleError(error)
    );
  }

  showModal() {
    var msg = 'There is no match with the filter';

    Swal.fire({
      position: 'top',
      icon: this.error[0].msg != msg ? 'error' : 'info',
      title: this.error[0].msg,
      showConfirmButton: false,
      timer: 2500
    })

  }

  handleResponse(data) {
    
    if (data == 'Redirect') {
      var elementClose = document.getElementById("closeProduct") as any;
      this.loadService();
      this.Service.error = [];
      elementClose.click();
    }
  
  }

  clearError() {
    this.error = [];
    this.form.search = '';
    this.Service.service;
    this.getProducts();
  }
  
  handleError(error) {
    this.error = error.error.errors;
    this.showModal();
    //console.log(this.error[0].msg != '');
  }

}
