import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';
//import * as jsPDF from 'jspdf';
declare var jsPDF: any;

@Component({
  selector: 'app-binnacle-report',
  templateUrl: './binnacle-report.component.html',
  styleUrls: ['./binnacle-report.component.css']
})
export class BinnacleReportComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;

  public binnacles: any = [];
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor(private ServiceR: ReportService) { }

  ngOnInit(): void {
    this.getBinnacles();
  }

  searchBinnacle() {
    return this.ServiceR.searchBinnacles(this.form).subscribe(
      result => this.loadBinnacle(result),
      error => this.handleError(error)
    );
  }

  loadBinnacle(result) {
    result.length == 0 ? this.getBinnacles() : this.binnacles = result;
  }

  getBinnacles() {
    return this.ServiceR.getBinnacles().subscribe(
      result => { this.binnacles = result },
      error => this.handleError(error)
    );
  }

  openPDF(): void {
    var doc = new jsPDF('p', 'pt');
    var elem = document.getElementById("binnacle-table");
    var res = doc.autoTableHtmlToJson(elem);
    doc.autoTable(res.columns, res.data);
    doc.output('dataurlnewwindow');
  }

  downloadPDF(): void {
    var doc = new jsPDF('p', 'pt');
    var elem = document.getElementById("binnacle-table");
    var res = doc.autoTableHtmlToJson(elem);
    doc.autoTable(res.columns, res.data);
    doc.save("Reporte de Bitácora");
  }

  showModalError(msg: string) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModalError(this.error[0].msg);
  }

}
