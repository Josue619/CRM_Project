import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from '../products/product-list/product-list.component';
import { AfterLoginService } from 'src/app/services/after-login.service';


const routes: Routes = [
  { path: 'products', component: ProductListComponent, canActivate: [AfterLoginService] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }