import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public error = [];
  
  public form = {
    username: null,
    email: null,
    password: null,
    card_id: null,
    code_phone: null,
    phone: null,
    roll: null,
    state: true,
  };

  constructor(
    private Service: MainService,
    private Token: TokenService,
    private Auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addUser() {
    return this.Service.addClient(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  handleResponse(data) {
    this.router.navigateByUrl('/users');
  }

  handleError(error) {
    this.error = error.error.errors;
    //console.log(this.error);
  }

}
