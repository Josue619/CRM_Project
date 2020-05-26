import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { AfterLoginService } from 'src/app/services/after-login.service';
import { UserComponent } from '../users/user/user.component';
import { UserListComponent } from './user-list/user-list.component';



@NgModule({
  declarations: [UserComponent, UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UserRoutingModule
  ],
  providers: [ MainService, AuthService, TokenService, AfterLoginService ]
})
export class UserModule { }