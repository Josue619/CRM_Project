import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../models/event.model';
import { Observable } from 'rxjs';

import * as moment from 'moment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {

  private id: string;
  private headers = new HttpHeaders();
  private baseFileUrl = 'http://localhost:3000/api/planner';

  public eventToEdit: Event;

  constructor( private http: HttpClient, private Token: TokenService ) { 
    this.id = this.Token.get() ? this.Token.payload(this.Token.get())._id : '0';
    this.headers = this.headers.append('auth_token', this.Token.get());
  }

  getEvents(): Observable<any> {
    return this.http.get(`${this.baseFileUrl}/events/${this.id}`, {headers: this.headers});
  }

  addEvent(event: Event): Observable<any> {
    return this.http.post(`${this.baseFileUrl}/addEvents`, event.getData(), {headers: this.headers});
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
