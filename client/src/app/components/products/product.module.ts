import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductRoutingModule } from './product-routing.module';
import { MainService } from '../../services/main.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { AfterLoginService } from 'src/app/services/after-login.service';
import { ProductListComponent } from './product-list/product-list.component';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProductRoutingModule,
    NgxPaginationModule
  ],
  providers: [ MainService, AuthService, TokenService, ProductService, AfterLoginService ]
})
export class ProductModule { }