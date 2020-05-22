import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from '../users/user/user.component';
import { AfterLoginService } from 'src/app/services/after-login.service';


const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AfterLoginService] }

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }