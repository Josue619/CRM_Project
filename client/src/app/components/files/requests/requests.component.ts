import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public error = [];
  public color: string;

  constructor(public Service: MainService) { }

  ngOnInit(): void {
    this.priority(this.Service.requests.priority_color);
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
    this.error = error.error.errors;
    console.log(this.error[0]);
  }

}
