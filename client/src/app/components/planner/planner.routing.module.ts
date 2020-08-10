import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterLoginService } from 'src/app/services/after-login.service';
import { EventsComponent } from './content/events/events.component';
import { ListEventsComponent } from './content/list-events/list-events.component';
import { ManageEventsComponent } from './content/manage-events/manage-events.component';
import { ContentComponent } from './content/content.component';


const routes: Routes = [
  { path: 'planner', component: ContentComponent, canActivate: [AfterLoginService] },
  { path: 'list-events', component: ListEventsComponent, canActivate: [AfterLoginService] },
  { path: 'manage-events', component: ManageEventsComponent, canActivate: [AfterLoginService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerRoutingModule { }