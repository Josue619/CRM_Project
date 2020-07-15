import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { RequestsComponent } from '../requests/requests.component';
import { ListServiceComponent } from '../list-service/list-service.component';
import { FileService } from 'src/app/services/file.service';
import { ProductService } from 'src/app/services/product.service';
import { ServicessComponent } from '../servicess/servicess.component';

import Swal from 'sweetalert2';
import { ListNeedsComponent } from '../list-needs/list-needs.component';

@Component({
  providers: [RequestsComponent, ListServiceComponent, ServicessComponent, ListNeedsComponent],
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  public roll = false;
  public users: any = [];
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor(
    private Service: MainService, 
    private ServiceF: FileService, 
    private ServiceP: ProductService, 
    private req: RequestsComponent,
    private clientS: ListServiceComponent,
    private needC: ListNeedsComponent,
    private services: ServicessComponent) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    return this.Service.getClients().subscribe(
      result => { this.users = result },
      error => this.handleError(error)
    );
  }

  searchClients() {
    console.log(this.form.search);
    
    return this.Service.searchClients(this.form).subscribe(
      result => this.loadUser(result),
      error => this.handleError(error)
    );
  }

  loadUser(result) {
    result.length == 0 ? this.getClients() : this.users = result;
  }

  request(id: number) {
    this.req.getRequests(id);
  }

  service(id: number) {
    //this.services.productsUser = [];
    this.clientS.getServices(id);
  }

  need(id: number) {
    this.needC.getNeeds(id);
  }

  clearRequest() {
    this.ServiceF.requests = [];
    this.ServiceF.error = [];
    this.ServiceP.service = [];
    this.ServiceP.error = [];

  }

  showModalError() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: this.error[0].msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModalError();
    console.log(this.error[0]);
  }

}
