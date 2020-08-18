import { Component, OnInit } from '@angular/core';
import { BinnacleService } from 'src/app/services/binnacle.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Binnacle } from 'src/app/models/binnacle';

@Component({
  selector: 'app-binnacle',
  templateUrl: './binnacle.component.html',
  styleUrls: ['./binnacle.component.css']
})
export class BinnacleComponent implements OnInit {

  public binnacles: any = [];
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor( private serviveB: BinnacleService, private router: Router ) { }

  ngOnInit(): void {
    this.getBinnacles();
  }

  searchBinnacle() {
    return this.serviveB.searchBinnacles(this.form).subscribe(
      result => this.loadUser(result),
      error => this.handleError(error)
    );
  }

  loadUser(result) {
    result.length == 0 ? this.getBinnacles() : this.binnacles = result;
  }

  getBinnacles() {
    return this.serviveB.getBinnacles().subscribe(
      result => { this.binnacles = result },
      error => this.handleError(error)
    );
  }

  binnacleDelete(binnacle: any) {
    this.showModal(binnacle);
  }

  showModal(binnacle: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar este registro de la bitácora?',
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
          'El registro ha sido eliminado.',
          'success'
        )
        this.deleteBinnacle(binnacle);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha realizado ningún cambio',
          'error'
        )
        this.router.navigateByUrl('/binnacle');
      }
    })
  }

  deleteBinnacle(binnacle: any) {
    const binnac = new Binnacle();
    binnac.id_Client = binnacle.id_Client;
    binnac.id_Request = binnacle.id_Request;
    binnac.state = false;

    return this.serviveB.deleteBinnacle(binnacle.id, binnac).subscribe(
      data =>  {
        this.getBinnacles();
        this.showModalError(data.msg);
      },
      error => this.handleError(error)
    );
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

  handleError(error) {
    this.error = error.error.errors;
    this.showModalError(this.error[0].msg);
  }

}
