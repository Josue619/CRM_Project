import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-needs',
  templateUrl: './list-needs.component.html',
  styleUrls: ['./list-needs.component.css']
})
export class ListNeedsComponent implements OnInit {

  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor(public Service: FileService, private router: Router) { }

  ngOnInit(): void {
  }

  searchNeeds() {
    this.form.id = this.Service.id_Client;
    return this.Service.searchNeeds(this.form).subscribe(
      result => this.loadServices(result),
      error => this.handleError(error)
    );
  }

  loadServices(result) {
    result.length == 0 ? this.getNeeds(this.Service.id_Client) : this.Service.needs = result;
  }

  getNeeds(id: number) {
    this.Service.id_Client = id;
    return this.Service.getNeedsClient(id.toString()).subscribe(
      result => { this.Service.needs = result },
      error => this.handleError(error)
    );
    
  }

  showModal() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: this.error[0].msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  clearError() {
    this.error = [];
    this.form.search = '';
  }

  handleResponse() {
    this.router.navigateByUrl('/file');
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModal();
  }

}
