import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
