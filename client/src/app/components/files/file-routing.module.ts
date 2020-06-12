import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileComponent } from '../files/file/file.component';
import { AfterLoginService } from 'src/app/services/after-login.service';


const routes: Routes = [
  { path: 'file', component: FileComponent, canActivate: [AfterLoginService] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }