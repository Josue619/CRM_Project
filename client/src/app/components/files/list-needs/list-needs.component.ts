import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { NeedC } from 'src/app/models/needC';

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

  addNeed() {
    this.closeNeeds();
    this.clearError();
    this.resetNeed()
  }

  editNeed(need: NeedC) {
    this.Service.need = Object.assign({}, need);
    this.Service.edit = true;
    this.closeNeeds();
  }

  deleteNeed(need: NeedC) {
    console.log(need.id);
    
    return this.Service.deleteNeed(need.id ,need).subscribe(
      data => this.getNeeds(this.Service.id_Client),
      error => this.handleError(error)
    );
  }

  closeNeeds() {
    var element = document.getElementById("closeNeeds");
    element.click();
  }

  resetNeed() {
    this.Service.edit = false;
    this.Service.need  = {
      id: 0,
      id_Client: null,
      future_needs: null,
      f_future_needs: new Date(),
      created_at: new Date()
    };
  }

  showModalDelete(need: NeedC) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar la necesidad del registro?',
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
          'Eliminado',
          'La necesidad ha sido removida del registro.',
          'success'
        )
        this.deleteNeed(need);
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
