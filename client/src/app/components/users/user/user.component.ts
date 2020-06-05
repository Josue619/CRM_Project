import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public error = [];
  
  public form: User = {
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

  constructor(
    public Service: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addUser() {
    delete this.Service.form.id;
    delete this.Service.form.created_at;
    return this.Service.addClient(this.Service.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  updateUser() {
    delete this.Service.form.created_at;
    return this.Service.updateClient(this.Service.form.id, this.Service.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.router.navigateByUrl('/users');
    location.reload();
  }

  handleError(error) {
    this.error = error.error.errors;
    //console.log(this.error);
  }

}
