import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AutofocusDirective } from './Directives/autofocus.directive';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const material = [
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule
]


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    AutofocusDirective,
    SidenavComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    CalendarModule,
    CheckboxModule,
    BrowserAnimationsModule,
    material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
