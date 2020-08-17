import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BinnacleComponent } from '../binnacle/binnacle/binnacle.component'
import { AfterLoginService } from 'src/app/services/after-login.service';
import { ClientsComponent } from './clients/clients.component';


const routes: Routes = [
  { path: 'binnacle', component: BinnacleComponent, canActivate: [AfterLoginService] },
  { path: 'inquiries', component: ClientsComponent, canActivate: [AfterLoginService] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BinnacleRoutingModule { }