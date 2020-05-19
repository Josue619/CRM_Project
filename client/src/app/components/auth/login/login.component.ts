import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

import { HttpHeaders } from '@angular/common/http';

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
    private authService: AuthService,
    private router: Router 
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    return this.authService.signin(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );

  }

  handleResponse(data) {
    console.log(data.auth_token);
    //this.authService.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.error;
  }



}
