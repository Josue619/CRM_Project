import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { UserComponent } from '../user/user.component';

@Component({
  providers:[ UserComponent ],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public pageActual: number = 1;

  public delete = false;
  public users: any = [];
  public error = [];
  public form = {
    search: null,
    id: null,
  };


  constructor(
    private Service: MainService,
    private router: Router,
    private userC: UserComponent) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    return this.Service.getClients().subscribe(
      result => { this.users = result },
      error => this.handleError(error)
    );
  }

  createClient() {
    this.router.navigateByUrl('/user');
  }

  searchClients() {
    return this.Service.searchClients(this.form).subscribe(
      result => { this.users = result },
      error => this.handleError(error)
    );
  }

  statusDelete(id: string) {
    this.delete = true;
    this.form.id = id;
    this.editMethod(id);
  }

  editMethod(id: string) {
    if (this.form.id) {
      this.Service.getClient(this.form.id).subscribe(
        res => {
          this.userC.form = res;
        },
        err => console.error(err)
      )
    }
  }

  deleteClient() {
    this.delete = false;
    return this.Service.deleteClient(this.form.id, this.userC.form).subscribe(
      data => this.handleResponse(),
      error => this.handleError(error)
    );
  }


  handleResponse() {
    this.router.navigateByUrl('/users');
  }

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error);
  }


}
