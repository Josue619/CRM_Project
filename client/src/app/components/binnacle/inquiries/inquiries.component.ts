import { Component, OnInit } from '@angular/core';
import { BinnacleService } from 'src/app/services/binnacle.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RequestC } from 'src/app/models/requestC';
import { Binnacle } from 'src/app/models/binnacle';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {

  public binnacle: Binnacle;
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor( public Service: BinnacleService, private router: Router ) { }

  ngOnInit(): void {
  }

  searchRequest() {
    this.form.id = this.Service.id_Client;
    return this.Service.searchRequest(this.form).subscribe(
      result => this.loadRequest(result),
      error => this.handleError(error)
    );
  }

  loadRequest(result) {
    result.length == 0 ? this.getRequests(this.Service.id_Client) : this.Service.requests = result;
  }

  getRequests(id: number) {
    this.Service.id_Client = id
    return this.Service.getRequests(id.toString()).subscribe(
      result => { this.Service.requests = result },
      error => this.handleError(error)
    );
  }

  searchRequestCheck() {
    this.form.id = this.Service.id_Client;
    return this.Service.searchRequestCheck(this.form).subscribe(
      result => this.loadRequest(result),
      error => this.handleError(error)
    );
  }

  loadRequestCheck(result) {
    result.length == 0 ? this.getRequestsCheck(this.Service.id_Client) : this.Service.requests = result;
  }

  getRequestsCheck(id: number) {

    this.Service.id_Client = id
    return this.Service.getRequestsCheck(id.toString()).subscribe(
      result => { this.Service.requests = result },
      error => this.handleError(error)
    );
  }

  setBinnacle(req: RequestC) {
    const binnacle: Binnacle = new Binnacle();
    binnacle.id_Client = req.id_Client;
    binnacle.id_Request = req.id;
    binnacle.state = true;
    return binnacle;
  }

  addToBinnacle(req: RequestC) {
    this.binnacle = this.setBinnacle(req);
    
    return this.Service.addBinnacles(this.binnacle).subscribe(
      result => this.handleResponseB(result),
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

  showModalError(msg: string) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  handleResponseB(data) { 
    if (data != '') {
      var elementClose = document.getElementById("closeInquiries") as any;
      this.error = [];
      this.showModalError(data);
      elementClose.click();
    }
  
  }

  handleResponse() {
    this.router.navigateByUrl('/binnacle');
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModalError(this.error[0].msg);
  }

  clearError() {
    this.error = [];
    this.form.search = '';
  }

}
