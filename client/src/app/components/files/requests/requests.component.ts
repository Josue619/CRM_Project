import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { RequestC } from '../../../models/requestC';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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
  public form = {
    search: null,
    id: null,
  };

  constructor(public Service: FileService, private router: Router) { }

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
      data => this.getRequests(req.id_Client),
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
      data => this.getRequests(req.id_Client),
      error => this.handleError(error)
    );
  }

  getReqClientByID(id: number) {
    return this.Service.getRequest(id.toString()).subscribe(
      result => { this.reqOne = result },
    );
  }

  requestDelete(req: RequestC) {
    this.getReqClientByID(req.id);
    this.showModal(req);
  }

  deleteRequest(req: RequestC) {
    return this.Service.deleteRequest(req.id, req).subscribe(
      data =>  this.getRequests(req.id_Client),
      error => this.handleError(error)
    );
  }

  showModal(req: RequestC) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro que desea eliminar está consulta?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Eliminada',
          'La consulta ha sido eliminado.',
          'success'
        )
        this.deleteRequest(req);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha realizado ningún cambio',
          'error'
        )
        this.router.navigateByUrl('/file');
      }
    })
  }

  showModalError() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: this.Service.error[0].msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  clearError() {
    this.Service.error = [];
    this.form.search = '';
  }

  handleResponse() {
    this.router.navigateByUrl('/file');
  }

  handleError(error) {
    this.Service.error = error.error.errors;
    this.showModalError();
    //console.log(this.Service.error[0]);
  }

}
