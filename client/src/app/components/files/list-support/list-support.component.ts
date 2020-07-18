import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SupportC } from 'src/app/models/supportC';

@Component({
  selector: 'app-list-support',
  templateUrl: './list-support.component.html',
  styleUrls: ['./list-support.component.css']
})
export class ListSupportComponent implements OnInit {

  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor(public Service: FileService, private router: Router) { }

  ngOnInit(): void {
  }

  searchSupports() {
    this.form.id = this.Service.id_Client;
    return this.Service.searchSupports(this.form).subscribe(
      result => this.loadSupports(result),
      error => this.handleError(error)
    );
  }

  getSupports(id: number) {
    this.Service.id_Client = id;
    return this.Service.getSupportsClient(id.toString()).subscribe(
      result => { this.Service.supports = result },
      error => this.handleError(error)
    );
  }

  loadSupports(result) {
    result.length == 0 ? this.getSupports(this.Service.id_Client) : this.Service.supports = result;
  }

  addSupport() {
    this.closeSupports();
    this.clearError();
    this.resetSuport();
  }

  closeSupports() {
    var element = document.getElementById("modalSupports");
    element.click();
  }

  resetSuport() {
    this.Service.edit = false;
    this.Service.support  = {
      id: 0,
      id_Client: null,
      support: null,
      f_support: new Date(),
      created_at: new Date()
    };
  }

  editSupport(support: SupportC) {
    this.Service.support = Object.assign({}, support);
    this.Service.edit = true;
    this.closeSupports();
  }

  showModalDelete(support: SupportC) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar el soporte del registro?',
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
          'El soporte ha sido removido del registro.',
          'success'
        )
        this.deleteSupport(support);
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

  deleteSupport(support: SupportC) {
    return this.Service.deleteSupport(support.id ,support).subscribe(
      data => this.getSupports(this.Service.id_Client),
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
