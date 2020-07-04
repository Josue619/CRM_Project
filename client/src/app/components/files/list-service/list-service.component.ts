import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ServicessComponent } from '../servicess/servicess.component';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  constructor(public Service: ProductService,
     private router: Router) { }

  ngOnInit(): void {
  }

  addService() {
    var element = document.getElementById("closeButton");
    element.click();
    this.router.navigateByUrl('/products');
  }

  loadService(id: number) {
    this.Service.id_Client = id;
    return this.Service.getClientServices(id.toString()).subscribe(
      result => { this.Service.service = result },
      error => this.handleError(error)
    );
  }

  clearError() {
    //this.Service.error = [];
  }

  handleError(error) {
    this.Service.error = error.error.errors;
    //console.log(this.Service.error[0]);
  }

}
