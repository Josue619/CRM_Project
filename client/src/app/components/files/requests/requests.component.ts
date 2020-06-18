import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { RequestC } from '../../../models/requestC';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public reqOne: RequestC;
  public error = [];
  public color: string;
  public edit = false;
  public solution = '';

  constructor(public Service: FileService) { }

  ngOnInit(): void {
  }

  loadRequests(id: string) {
    return this.Service.getRequests(id).subscribe(
      result => { this.Service.requests = result },
      error => this.handleError(error)
    );
  }

  priority(value: string) {
    if (value == '1') {
      return 'btn btn-danger';
    }else if (value == '2') {
      return 'btn btn-warning';
    }
    return 'btn btn-success';
  }

  tryEdit(id: string, solution: string) {
    this.edit = true;
    this.solution = solution;
    this.getReqClientByID(id);
  }

  editRequest(id: string, id_client: string) {
    this.edit = false;
    this.reqOne.solution = this.solution;
    delete this.reqOne.created_at;
    return this.Service.updateRequest(id, this.reqOne).subscribe(
      data => this.loadRequests(id_client),
      error => this.handleError(error)
    );
  }

  getReqClientByID(id: string) {
    return this.Service.getRequest(id).subscribe(
      result => { this.reqOne = result },
    );
  }

  handleError(error) {
    this.Service.error = error.error.errors;
    console.log(this.Service.error[0]);
  }

}
