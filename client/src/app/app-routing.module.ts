import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {} from './components/auth/auth.module';
import {} from './components/users/user.module';
import {} from './components/products/product.module';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', loadChildren: './components/auth/auth.module#AuthModule'},
  { path: '', loadChildren: './components/users/user.module#UserModule'},
  { path: '', loadChildren: './components/products/product.module#ProductModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
