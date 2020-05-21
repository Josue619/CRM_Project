import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public loggedIn: boolean;
  public toggled = 'toggled';

  constructor(
    private Auth: AuthService,
    private Token: TokenService,
    private route: Router

  ) { }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.route.navigateByUrl('/login');
  }

  sideBar() {
    if (this.toggled) {
      this.toggled = '';
    }else {
      this.toggled = 'toggled';
    }
  }


}
