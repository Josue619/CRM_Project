import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ServicessComponent } from '../servicess/servicess.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  public form = {
    search: null,
    id: null,
  };

  constructor(public Service: ProductService,private router: Router) { }

  ngOnInit(): void {
  }

  searchServices() {
    this.form.id = this.Service.id_Client;
    return this.Service.searchServices(this.form).subscribe(
      result => this.loadServices(result),
      error => this.handleError(error)
    );
  }

  loadServices(result) {
    result.length == 0 ? this.getServices(this.Service.id_Client) : this.Service.service = result;
  }

  addService() {
    var element = document.getElementById("closeButton");
    element.click();
    this.router.navigateByUrl('/products');
  }

  getServices(id: number) {
    this.Service.id_Client = id;
    return this.Service.getClientServices(id.toString()).subscribe(
      result => { this.Service.service = result },
      error => this.handleError(error)
    );
  }

  showModal() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: this.Service.error[0].msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  clearError() {
    this.Service.error = [];
    this.form.search = '';
  }

  handleError(error) {
    this.Service.error = error.error.errors;
    this.showModal();
    //console.log(this.Service.error[0]);
  }

}
