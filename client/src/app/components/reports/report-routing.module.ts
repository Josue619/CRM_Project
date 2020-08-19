import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterLoginService } from 'src/app/services/after-login.service';
import { BinnacleReportComponent } from './binnacle-report/binnacle-report.component';
import { EventReportComponent } from './event-report/event-report.component';

const routes: Routes = [
  { path: 'report/binnacle', component: BinnacleReportComponent, canActivate: [AfterLoginService] },
  { path: 'report/events', component: EventReportComponent, canActivate: [AfterLoginService] }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }