import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from '../profile/profile.component'
import { BeforeLoginService } from 'src/app/services/before-login.service';
import { AfterLoginService } from 'src/app/services/after-login.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService] },
  { path: 'signup', component: SignupComponent, canActivate: [BeforeLoginService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService] }

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }