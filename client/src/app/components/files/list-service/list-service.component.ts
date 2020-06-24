import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  constructor(private Service: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  addService() {
    var element = document.getElementById("closeButton");
    element.click();
    this.Service.addService = true;
    this.router.navigateByUrl('/products');
  }

}
