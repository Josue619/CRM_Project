import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: any = [];
  public form = {
    search: null,
    id: null,
  };

  constructor() { }

  ngOnInit(): void {
  }

  searchProducts() {
    console.log('Busqueda...')
  }

  editMethod() {
  }

  statusDelete() {
  }

}
