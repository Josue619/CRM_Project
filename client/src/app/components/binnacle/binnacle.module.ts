import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BinnacleRoutingModule } from './binnacle-routing.module';
import { AfterLoginService } from 'src/app/services/after-login.service';
import { ClientsComponent } from './clients/clients.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { MainService } from 'src/app/services/main.service';
import { BinnacleComponent } from './binnacle/binnacle.component';


@NgModule({
  declarations: [ ClientsComponent, InquiriesComponent, BinnacleComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BinnacleRoutingModule
  ],
  providers: [ MainService, AfterLoginService ]
})

export class BinnacleModule { }