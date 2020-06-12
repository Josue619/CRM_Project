import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileRoutingModule } from './file-routing.module';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { AfterLoginService } from 'src/app/services/after-login.service';
import { FileComponent } from '../files/file/file.component';



@NgModule({
  declarations: [FileComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FileRoutingModule,
  ],
  providers: [ MainService, AuthService, TokenService, AfterLoginService ]
})
export class FileModule { }