import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from '../users/user/user.component';
import { UserListComponent } from '../users/user-list/user-list.component';
import { AfterLoginService } from 'src/app/services/after-login.service';


const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AfterLoginService] },
  { path: 'user/edit/:id', component: UserComponent, canActivate: [AfterLoginService] },
  { path: 'users', component: UserListComponent, canActivate: [AfterLoginService] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }