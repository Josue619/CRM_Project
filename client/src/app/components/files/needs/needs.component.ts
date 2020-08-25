import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-needs',
  templateUrl: './needs.component.html',
  styleUrls: ['./needs.component.css']
})
export class NeedsComponent implements OnInit {

  public error = [];

  constructor(public Service: FileService) { }

  ngOnInit(): void {
  }

  addNeed() {
    delete this.Service.need.id;
    delete this.Service.need.created_at;
    this.Service.need.id_Client = this.Service.id_Client;

    return this.Service.addNeed(this.Service.need).subscribe(
      result => this.handleResponse(result),
      error => this.handleError(error)
    );
  }

  updateNeed() {
    delete this.Service.need.created_at;
    return this.Service.updateNeed(this.Service.need.id, this.Service.need).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  getNeeds() {
    return this.Service.getNeedsClient(this.Service.id_Client.toString()).subscribe(
      result => { this.Service.needs = result },
      error => this.handleError(error)
    );
  }

  cancel() {
    var element = document.getElementById("closeNeed");
    element.click();
    this.getNeeds();
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
    var element = document.getElementById("cancelBtnN");
    element.click();
  }

  clearError() {
    this.error = [];
  }

  handleResponse(result) {
    if (result == 'Redirect') {
      this.Service.need = {};
      this.cancelBtn();
    }
    
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModal();
  }

}
