import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public error = [];
  public color: string;

  constructor(public Service: FileService) { }

  ngOnInit(): void {
  }

  loadRequests(id: string) {
    return this.Service.getRequest(id).subscribe(
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

  handleError(error) {
    this.Service.error = error.error.errors;
    console.log(this.Service.error[0]);
  }

}
