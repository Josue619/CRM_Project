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
  public color: string;
  public editS = false;
  public editP = false;
  public solution: string = '';
  public priorityC: string = '';

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

  tryEditS(req: RequestC) {
    this.editS = true;
    this.solution = req.solution;
    this.getReqClientByID(req.id);
  }

  tryEditP(req: RequestC) {
    this.editP = true;
    req.state = false;
    this.priorityC = req.priority_color;
    this.getReqClientByID(req.id);
  }

  editRequestS(req: RequestC) {
    if (req.solution.trim().length === 0) {
      req.solution = this.solution;
    }
    
    this.editS = false;
    this.reqOne.solution = req.solution;
    delete this.reqOne.created_at;
    return this.Service.updateRequest(req.id, this.reqOne).subscribe(
      data => this.loadRequests(req.id_Client),
      error => this.handleError(error)
    );
  }

  editRequestP(req: RequestC) {
    if (req.priority_color.trim().length === 0) {
      req.priority_color = this.priorityC;
    }

    this.editP = false;
    this.reqOne.priority_color = req.priority_color;
    this.reqOne.state = true;
    delete this.reqOne.created_at;
    return this.Service.updateRequest(req.id, this.reqOne).subscribe(
      data => this.loadRequests(req.id_Client),
      error => this.handleError(error)
    );
  }

  getReqClientByID(id: number) {
    return this.Service.getRequest(id.toString()).subscribe(
      result => { this.reqOne = result },
    );
  }

  handleError(error) {
    this.Service.error = error.error.errors;
    console.log(this.Service.error[0]);
  }

}
