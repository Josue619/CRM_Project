import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  public form = {
    search: null,
    id: null,
  };

  constructor(public Service: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  searchServices() {
    this.form.id = this.Service.id_Client;
    return this.Service.searchServices(this.form).subscribe(
      result => this.loadServices(result),
      error => this.handleError(error)
    );
  }

  loadServices(result) {
    result.length == 0 ? this.getServices(this.Service.id_Client) : this.Service.service = result;
  }

  addService() {
    var element = document.getElementById("closeButton");
    element.click();
    this.router.navigateByUrl('/products');
  }

  getServices(id: number) {
    this.Service.id_Client = id;
    return this.Service.getClientServices(id.toString()).subscribe(
      result => { this.Service.service = result },
      error => this.handleError(error)
    );
  }

  showModal() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: this.Service.error[0].msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  deleteService(service: any) {
    return this.Service.deleteService(service).subscribe(
      data => this.getServices(this.Service.id_Client),
      error => this.handleError(error)
    );
  }

  showModalDelete(service: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar este servicio?',
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
          'El servicio ha sido removido.',
          'success'
        )
        this.deleteService(service);
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

  clearError() {
    this.Service.error = [];
    this.form.search = '';
  }

  handleResponse() {
    this.router.navigateByUrl('/file');
  }

  handleError(error) {
    this.Service.error = error.error.errors;
    this.showModal();
    //console.log(this.Service.error[0]);
  }

}
