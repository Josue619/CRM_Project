import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterLoginService } from 'src/app/services/after-login.service';
import { ListEventsComponent } from './content/list-events/list-events.component';
import { ManageEventsComponent } from './content/manage-events/manage-events.component';
import { PlannerComponent } from './planner/planner.component';


const routes: Routes = [
  { path: 'planner', component: PlannerComponent, canActivate: [AfterLoginService] },
  { path: 'list-events', component: ListEventsComponent, canActivate: [AfterLoginService] },
  { path: 'manage-events', component: ManageEventsComponent, canActivate: [AfterLoginService] },
  { path: '**', pathMatch: 'full', redirectTo: 'planner' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerRoutingModule { }