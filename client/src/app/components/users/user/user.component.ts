import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
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

  public edit: boolean = false;

  constructor(
    private Service: MainService,
    private Token: TokenService,
    private Auth: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editMethod();
  }

  addUser() {
    delete this.form.id;
    delete this.form.created_at;
    return this.Service.addClient(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  updateUser() {
    delete this.form.created_at;
    return this.Service.updateClient(this.form.id, this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  editMethod() {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.Service.getClient(params.id).subscribe(
        res => {
          this.form = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  handleResponse(data) {
    this.router.navigateByUrl('/users');
  }

  handleError(error) {
    this.error = error.error.errors;
    //console.log(this.error);
  }

}
