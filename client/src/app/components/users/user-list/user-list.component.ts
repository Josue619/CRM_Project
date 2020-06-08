import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { UserComponent } from '../user/user.component';
import { TokenService } from 'src/app/services/token.service';

import Swal from 'sweetalert2';

import { User } from '../../../models/user';

@Component({
  providers: [UserComponent],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private authUser: any = [];
  public pageActual: number = 1;
  

  public delete = false;
  public roll = false;
  public users: any = [];
  public error = [];
  public form = {
    search: null,
    id: null,
  };


  constructor(
    private Service: MainService,
    private Token: TokenService,
    private router: Router) { }

  ngOnInit(): void {
    this.getClients();
    this.identifyUser();
  }

  getClients() {
    return this.Service.getClients().subscribe(
      result => { this.users = result },
      error => this.handleError(error)
    );
  }

  searchClients() {
    return this.Service.searchClients(this.form).subscribe(
      result => this.loadUser(result),
      error => this.handleError(error)
    );
  }

  statusDelete(form: User) {
    this.form.id = form.id;
    this.Service.form = Object.assign({}, form);
    this.showModal();
  }

  editMethod(form: User) {
    this.Service.form = Object.assign({}, form);
    this.Service.edit = true;
  }

  deleteClient() {
    return this.Service.deleteClient(this.form.id, this.Service.form).subscribe(
      data => this.handleResponse(),
      error => this.handleError(error)
    );
  }

  resetForm() {
    this.Service.edit = false;
    this.Service.form  = {
      id: 0,
      username: null,
      email: null,
      password: null,
      card_id: null,
      code_phone: null,
      phone: null,
      roll: null,
      state: true,
      created_at: new Date()
    };
  }

  loadUser(result) {
    result.length == 0 ? this.getClients() : this.users = result;
  }

  identifyUser() {
    const auth_id = this.Token.payload(this.Token.get())._id;
    this.Service.getClient(auth_id).subscribe(
      data => this.checkRoll(data)
    );
  }

  checkRoll(data) {
    this.authUser = data;
    this.authUser.roll != 'Super Admin' ? this.roll = true : this.roll = false;
  }

  handleResponse() {
    this.getClients();
    this.router.navigateByUrl('/users');
  }

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error[0]);
  }

  showModal() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro que desea eliminar este usuario?',
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
          'El cliente ha sido eliminado.',
          'success'
        )
        this.deleteClient();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha realizado ningún cambio',
          'error'
        )
        this.router.navigateByUrl('/users');
      }
    })
  }


}
