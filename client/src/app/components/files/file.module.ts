import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileRoutingModule } from './file-routing.module';
import { MainService } from '../../services/main.service';
import { FileService } from 'src/app/services/file.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { ProductService } from 'src/app/services/product.service';
import { AfterLoginService } from 'src/app/services/after-login.service';
import { FileComponent } from '../files/file/file.component';
import { RequestsComponent } from './requests/requests.component';
import { ListServiceComponent } from './list-service/list-service.component';
import { ServicessComponent } from './servicess/servicess.component';
import { ListNeedsComponent } from './list-needs/list-needs.component';
import { NeedsComponent } from './needs/needs.component';
import { ListSupportComponent } from './list-support/list-support.component';
import { SupportComponent } from './support/support.component';



@NgModule({
  declarations: [FileComponent, RequestsComponent, ListServiceComponent, ServicessComponent, ListNeedsComponent, NeedsComponent, ListSupportComponent, SupportComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FileRoutingModule,
  ],
  providers: [ MainService, FileService, AuthService, TokenService, ProductService, AfterLoginService ]
})
export class FileModule { }