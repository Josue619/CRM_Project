import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { RequestsComponent } from '../requests/requests.component';
import { ListServiceComponent } from '../list-service/list-service.component';
import { FileService } from 'src/app/services/file.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  providers: [RequestsComponent, ListServiceComponent],
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
    private clientS: ListServiceComponent) { }

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
    return this.Service.searchClients(this.form).subscribe(
      result => this.loadUser(result),
      error => this.handleError(error)
    );
  }

  loadUser(result) {
    result.length == 0 ? this.getClients() : this.users = result;
  }

  request(id: string) {
    this.req.loadRequests(id);
  }

  service(id: number) {
    this.clientS.loadService(id);
  }

  clearRequest() {
    this.ServiceF.requests = [];
    this.ServiceF.error = [];
    this.ServiceP.service = [];
    this.ServiceP.error = [];

  }

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error[0]);
  }

}
