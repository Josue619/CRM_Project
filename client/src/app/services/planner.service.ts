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
    return this.http.post(`${this.baseFileUrl}/event`, event.getData(), {headers: this.headers});
  }

  editEvent(): Observable<any> {    
    return this.http.put(`${this.baseFileUrl}/event/${this.eventToEdit.id}`, this.eventToEdit, {headers: this.headers});
  }

  deleteEvent(id: string, event: Event) {
    const httpOptions = {
      headers: this.headers,
      body: event
    };

    return this.http.delete(`${this.baseFileUrl}/event/${id}`, httpOptions);
  }

}
