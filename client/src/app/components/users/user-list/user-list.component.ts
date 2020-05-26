import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { User } from '../../../models/user';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: any = [];
  public error = [];
  public form = {
    search: null,
    id: null,
  };


  constructor(private Service: MainService, private router: Router) { }

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

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error);
  }


}
