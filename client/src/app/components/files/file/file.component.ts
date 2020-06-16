import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { RequestsComponent } from '../requests/requests.component';
import { FileService } from 'src/app/services/file.service';

@Component({
  providers: [RequestsComponent],
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

  constructor(private Service: MainService, private ServiceF: FileService, private req: RequestsComponent) { }

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

  clearRequest() {
    this.ServiceF.requests = null;
  }

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error[0]);
  }

}