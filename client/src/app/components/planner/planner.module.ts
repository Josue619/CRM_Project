import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlannerRoutingModule } from './planner.routing.module';

//import { FullCalendarModule } from 'primeng/fullcalendar';
//import { CalendarModule } from 'primeng/calendar';
//import { CheckboxModule } from 'primeng/checkbox';

import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { EventsComponent } from './content/events/events.component';
import { ListEventsComponent } from './content/list-events/list-events.component';
import { ManageEventsComponent } from './content/manage-events/manage-events.component';



@NgModule({
  declarations: [ ContentComponent, HeaderComponent, EventsComponent, ListEventsComponent, ManageEventsComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PlannerRoutingModule
  ],
  providers: [ 
  ]
})
export class PlannerModule { }