import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { InquiriesComponent } from '../inquiries/inquiries.component';
import { BinnacleService } from 'src/app/services/binnacle.service';
import Swal from 'sweetalert2';

@Component({
  providers: [ InquiriesComponent ], 
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public users: any = [];
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor( private ServiceC: MainService, private serviveB: BinnacleService, private inq: InquiriesComponent) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    return this.ServiceC.getClients().subscribe(
      result => { this.users = result },
      error => this.handleError(error)
    );
  }

  searchClients() {
    return this.ServiceC.searchClients(this.form).subscribe(
      result => this.loadUser(result),
      error => this.handleError(error)
    );
  }

  loadUser(result) {
    result.length == 0 ? this.getClients() : this.users = result;
  }

  inquiries(id: number) {
    this.serviveB.requests = [];
    this.serviveB.attended = false;
    this.inq.getRequests(id);
  }

  inquiriesCheck(id: number) {
    this.serviveB.requests = [];
    this.serviveB.attended = true;
    this.inq.getRequestsCheck(id);
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
  }

}
