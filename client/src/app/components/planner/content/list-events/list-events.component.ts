import { Component, OnInit } from '@angular/core';
import { DdrBlockItem, DdrAction } from 'ddr-block-list';
import { Router } from '@angular/router';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

  public blockItems: DdrBlockItem[];
  public eventList: any = [];

  public EDIT_EVENT: string = "EDIT_EVENT";
  public DELETE_EVENT: string = "DELETE_EVENT";

  constructor( private eventService: PlannerService, private router: Router ) { 
    this.blockItems = [];
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    let actions: DdrAction[] = [
      {
        'label': "Editar evento",
        'value': this.EDIT_EVENT
      },
      {
        'label': "Eliminar evento",
        "value": this.DELETE_EVENT
      }
    ];

    this.eventService.getEvents().subscribe(
      events => {
        events.forEach(event => {
          let blockItem = new DdrBlockItem();
          blockItem.item = event;
          this.borderColor(blockItem, event.className);
          blockItem.actions = actions;
  
          this.blockItems.push(blockItem);
          
        });
        
      }
    );
  }

  borderColor(blockItem: DdrBlockItem, className: string) {
    switch (className) {
      case 'task':
        blockItem.borderColor = '#7c7c7c';
        break;
    
      case 'appointment':
        blockItem.borderColor = '#c4302b';
        break;

      case 'meeting':
        blockItem.borderColor = '#6441a5';
        break;
    }
  }

  getAction($event: DdrAction) {

    switch ($event.value) {
      case this.EDIT_EVENT:
        this.eventService.eventToEdit = $event.item;
        this.router.navigate(['/manage-events']);
        break;
      
      case this.DELETE_EVENT:
        this.eventService.deleteEvent($event.item.id);
        let index = this.blockItems.findIndex(block => block.item.id === $event.item.id);
        this.blockItems.splice(index, 1);
        this.blockItems = [];
        break;
    }

  }

  selectItem($event) {
    if ($event.item.end) {
      $event.item.endDate = new Date($event.item.end);
    }
    
    this.eventService.eventToEdit = $event.item;
    this.router.navigate(['/manage-events']);
  }

  typeEvent(event: string) {
    if (event == "task") {
      return "Tarea";
    } 
    if (event == "appointment") {
      return "Cita";
    }
    return "Reunión";
  }

}
