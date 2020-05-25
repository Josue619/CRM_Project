import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
    return this.Service.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  handleResponse(data) {
    this.Token.handle(data.auth_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error);
  }

}
