import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { Observable } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {

  public eventToEdit: Event;

  constructor() { }

  getEvents(): Observable<Event[]> {
    return null;
  }

  addEvent(event: Event): Promise<boolean> {

    return new Promise((resolve, reject) => {

      try {
        
        //let eventRef = this.afd.database.ref('events');
//
        //let newEvent = eventRef.push();
//
        //event.id = newEvent.key
        //event.start = moment(event.startDate).format('YYYY-MM-DDTHH:mm')
        //if (event.endDate) {
        //  event.end = moment(event.endDate).format('YYYY-MM-DDTHH:mm') 
        //}
      
        resolve(true);

      } catch (error) {
        reject('Error al añadir el evento');
      }

    });

  }

  editEvent() {
    return new Promise((resolve, reject) => {

      try {
        this.eventToEdit.start = moment(this.eventToEdit.startDate).format('YYYY-MM-DDTHH:mm');

        if (this.eventToEdit.endDate) {
          this.eventToEdit.end = moment(this.eventToEdit.endDate).format('YYYY-MM-DDTHH:mm'); 
        }

        resolve(true);

      } catch (error) {
        reject('Error al editar el evento');
      }

    });
  }

  deleteEvent(id: string) {
    return new Promise((resolve, reject) => {

      try {
        resolve(true);

      } catch (error) {
        reject('Error al borrar el evento');
      }

    });
  }

}
