import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { AfterLoginService } from 'src/app/services/after-login.service';
import { BeforeLoginService } from 'src/app/services/before-login.service';



@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [ MainService, AuthService, TokenService, AfterLoginService, BeforeLoginService ]
})
export class AuthModule { }
