import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-needs',
  templateUrl: './needs.component.html',
  styleUrls: ['./needs.component.css']
})
export class NeedsComponent implements OnInit {

  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor() { }

  ngOnInit(): void {
  }

  clearError() {
    this.error = [];
    this.form.search = '';
  }

}
