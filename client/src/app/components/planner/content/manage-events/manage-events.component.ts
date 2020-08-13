import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlannerService } from 'src/app/services/planner.service';
import { DdrConfigurationService } from 'ddr-configuration';
import { TokenService } from 'src/app/services/token.service';
import { Event } from 'src/app/models/event.model';
import { Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit, OnDestroy {

  public event: Event;
  public showEnd: boolean;
  public today: Date;
  public localeEs: any;

  private id_User: string;
  public mode: number;

  public MODE_ADD = 1;
  public MODE_EDIT = 2;

  public error = [];

  constructor( 
    private eventService: PlannerService, 
    private config: DdrConfigurationService, 
    private token: TokenService,
    private router: Router ) { 
    this.manageEvent();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.eventService.eventToEdit = null;
  }

  getUserId() {
    this.id_User = this.token.get() ? this.token.payload(this.token.get())._id : '0';
    return this.id_User; 
  }

  manageEvent() {
    if (this.eventService.eventToEdit) {
      this.event = this.eventService.eventToEdit;
      this.today = new Date();
      this.event.startDate = new Date(this.event.start);

      this.showEnd = this.event.end != null;

      if (this.showEnd) {
        this.event.endDate = new Date(this.event.end);
      }

      this.mode = this.MODE_EDIT;

    } else {
      this.event = new Event({});
      this.event.id_User = this.getUserId();
      this.event.title = '';
      this.event.startDate = new Date();
      this.event.endDate = new Date();
      this.event.description = '';
      this.event.className = "task";
      this.event.url = '';
      this.event.emailSent = false;
      this.mode = this.MODE_ADD;
      this.showEnd = false;
    }
    this.today = new Date();

    this.localeEs = this.config.getData("locale");
  }

  addEditEvent() {
    if (!this.showEnd) {
      this.event.endDate = null;
    }

    if (this.eventService.eventToEdit) {
      this.editEvent();
    } else {
      this.addEvent();
    }
  }

  editEvent() {
    this.eventService.eventToEdit.start = moment(this.eventService.eventToEdit.startDate).format('YYYY-MM-DDTHH:mm');

    if (this.eventService.eventToEdit.endDate) {
      this.eventService.eventToEdit.end = moment(this.eventService.eventToEdit.endDate).format('YYYY-MM-DDTHH:mm'); 
    }
    return this.eventService.editEvent().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  addEvent() {
    this.event.start = moment(this.event.startDate).format('YYYY-MM-DDTHH:mm');
    this.event.end = null;
    if (this.event.endDate) {
      this.event.end = moment(this.event.endDate).format('YYYY-MM-DDTHH:mm');
    }

    return this.eventService.addEvent(this.event).subscribe(
      result => this.handleResponse(result),
      error => this.handleError(error)
    );
    
  }

  handleResponse(result) {
    if (result == 'Redirect') {
      this.router.navigate(['/list-events']);
    } 
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModal();
  }

  showModal() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: this.error[0].msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

}
