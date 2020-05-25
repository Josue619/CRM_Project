import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../../services/main.service';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private Service: MainService,
    private Token: TokenService,
    private Auth: AuthService,
    private router: Router

    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    return this.Service.signin(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );
  }

  handleResponse(data) {
    this.Token.handle(data.auth_token);
    this.Auth.changeAuthStatus(true);
  }

  handleError(error) {
    this.error = error.error;
    console.log(this.error);
  }



}
