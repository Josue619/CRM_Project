import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AutofocusDirective } from './Directives/autofocus.directive';

import { DdrConfigurationModule, DdrConfigurationService } from 'ddr-configuration';

export function configFactory(provider: DdrConfigurationService) {
  return () => provider.getDataFromJSON('./assets/locale//localeEs.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    CalendarModule,
    CheckboxModule,
    BrowserAnimationsModule,
    DdrConfigurationModule
  ],
  providers: [
    DdrConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ DdrConfigurationService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
