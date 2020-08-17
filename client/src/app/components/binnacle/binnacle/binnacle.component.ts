import { Component, OnInit } from '@angular/core';
import { BinnacleService } from 'src/app/services/binnacle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-binnacle',
  templateUrl: './binnacle.component.html',
  styleUrls: ['./binnacle.component.css']
})
export class BinnacleComponent implements OnInit {

  public binnacles: any = [];
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor( private serviveB: BinnacleService ) { }

  ngOnInit(): void {
    this.getBinnacles();
  }

  searchBinnacle() {
    
  }

  getBinnacles() {
    return this.serviveB.getBinnacles().subscribe(
      result => { this.binnacles = result },
      error => this.handleError(error)
    );
  }

  showModalError() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: this.error[0].msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModalError();
  }

}
