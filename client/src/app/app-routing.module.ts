import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {} from './components/auth/auth.module'


const routes: Routes = [
  { path: '', redirectTo: '/components', pathMatch: 'full' },
  { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
