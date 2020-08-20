import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportRoutingModule } from './report-routing.module';
import { AfterLoginService } from 'src/app/services/after-login.service';
import { BinnacleReportComponent } from './binnacle-report/binnacle-report.component';
import { EventReportComponent } from './event-report/event-report.component';
import { SendReportComponent } from './send-report/send-report.component';


@NgModule({
  declarations: [ BinnacleReportComponent, EventReportComponent, SendReportComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReportRoutingModule
  ],
  providers: [ AfterLoginService ]
})

export class ReportModule { }