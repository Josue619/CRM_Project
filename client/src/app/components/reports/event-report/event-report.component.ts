import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

import Swal from 'sweetalert2';
declare var jsPDF: any;

@Component({
  selector: 'app-event-report',
  templateUrl: './event-report.component.html',
  styleUrls: ['./event-report.component.css']
})
export class EventReportComponent implements OnInit {

  public events: any = [];
  public error = [];
  public end: string = 'No definida';
  public form = {
    search: null,
    id: null,
  };

  constructor(private ServiceR: ReportService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  searchEvents() {
    this.search();
    return this.ServiceR.searchEvents(this.form).subscribe(
      result => this.loadEvent(result),
      error => this.handleError(error)
    );
  }

  loadEvent(result) {
    result.length == 0 ? this.getEvents : this.events = result;
  }

  getEvents() {
    return this.ServiceR.getEvents().subscribe(
      result => { this.events = result },
      error => this.handleError(error)
    );
  }

  setType(type: string) {
    if (type == 'task') {
      return 'Tarea';
    } 
    else if (type == 'appointment') {
      return 'Cita';
    }
    return 'Reunión';
  }

  search() {
    this.form.search.toLocaleLowerCase();
    if (this.form.search == 'tarea') {
      this.form.search = 'task';
    } 
    else if (this.form.search == 'cita') {
      this.form.search = 'appointment';
    }
    else if (this.form.search == 'reunion') {
      this.form.search = 'meeting';
    }
    return this.form.search;
  }

  openPDF(): void {
    var doc = new jsPDF('p', 'pt');
    var elem = document.getElementById("planner-table");
    var res = doc.autoTableHtmlToJson(elem);
    doc.autoTable(res.columns, res.data);
    doc.output('dataurlnewwindow');
  }

  downloadPDF(): void {
    var doc = new jsPDF('p', 'pt');
    var elem = document.getElementById("planner-table");
    var res = doc.autoTableHtmlToJson(elem);
    doc.autoTable(res.columns, res.data);
    doc.save("Reporte de Eventos");
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
