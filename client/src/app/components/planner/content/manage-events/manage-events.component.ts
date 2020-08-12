import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlannerService } from 'src/app/services/planner.service';
import { DdrConfigurationService } from 'ddr-configuration';
import { TokenService } from 'src/app/services/token.service';
import { Event } from 'src/app/models/event.model';

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

  constructor( private eventService: PlannerService, private config: DdrConfigurationService, private token: TokenService ) { 
    this.manageEvent();
    this.getUserId();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.eventService.eventToEdit = null;
  }

  getUserId() {
    this.id_User = this.token.get() ? this.token.payload(this.token.get())._id : '0';
    console.log(this.id_User);
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
      this.event.startDate = new Date();
      this.event.endDate = new Date();
      this.event.className = "task";
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

    this.eventService.editEvent().then(success => {
      if (success) {
        console.log("Se ha editado el evento");
      }
      
    }, error => {
      console.log(error);
    });
  }

  addEvent() {

    console.log(this.event);

    this.eventService.addEvent(this.event).then(success => {
      if (success) {
        console.log("Se ha registrado el evento");
      }
      
    }, error => {
      console.log(error);
    });
    
  }

}
