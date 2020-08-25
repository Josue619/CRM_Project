import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  public error = [];

  constructor(public Service: FileService) { }

  ngOnInit(): void {
  }

  addSupport() {
    delete this.Service.support.id;
    delete this.Service.support.created_at;
    this.Service.support.id_Client = this.Service.id_Client;

    return this.Service.addSupport(this.Service.support).subscribe(
      result => this.handleResponse(result),
      error => this.handleError(error)
    );
  }

  updateSupport() {
    delete this.Service.support.created_at;
    return this.Service.updateSupport(this.Service.support.id, this.Service.support).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  getSupports() {
    return this.Service.getSupportsClient(this.Service.id_Client.toString()).subscribe(
      result => { this.Service.supports = result },
      error => this.handleError(error)
    );
  }

  cancel() {
    var element = document.getElementById("closeSuport");
    element.click();
    this.getSupports();
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

  cancelBtn() {
    var element = document.getElementById("cancelBtnSP");
    element.click();
  }

  clearError() {
    this.error = [];
    //this.cancelBtn();
  }

  handleResponse(result) {
    if (result == 'Redirect') {
      this.Service.support = {};
      this.cancelBtn();
    }
    
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModal();
  }

}
