import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  // = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerNav = [
    {name: "Home", route: "/", icon: "home"}
  ];

  fillerMant = [
    {name: "Clientes", route: "users", icon: "group"},
    {name: "Productos", route: "products", icon: "category"}
  ];

  fillerFile = [
    {name: "Expediente", route: "file", icon: "account_box"}
  ];

  fillerPlanner = [
    {name: "Planificador", route: "planner", icon: "today"}
  ];

  private _mobileQueryListener: () => void;

  public loggedIn: boolean = false;
  public toggled = 'toggled';

  constructor(
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher,
    private Auth: AuthService,
    private Token: TokenService,
    private route: Router
    ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    //revisar estatus
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

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
