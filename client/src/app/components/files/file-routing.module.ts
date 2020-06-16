import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileComponent } from './file/file.component';
import { RequestsComponent } from './requests/requests.component';
import { AfterLoginService } from 'src/app/services/after-login.service';


const routes: Routes = [
  { path: 'file', component: FileComponent, canActivate: [AfterLoginService] },
  { path: 'requests', component: RequestsComponent, canActivate: [AfterLoginService] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }