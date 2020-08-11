import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FullCalendar } from 'primeng/fullcalendar';

import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Event } from '../../../../models/event.model';

import esLocale from '@fullcalendar/core/locales/es';
import Tooltip from 'tooltip.js'
import { Calendar } from '@fullcalendar/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit {

  @ViewChild('fc') fc: FullCalendar;

  public events: Event[];
  public optionsMonth: any;
  public optionsList: any;

  constructor() {
    Calendar.name;
    this.optionsM();
    this.optionsL();
  }

  ngOnInit(): void {
  }

  optionsM() {
    this.optionsMonth = {
      plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
      locale: esLocale,
      headerToolbar: {
        start: 'today prev,next',
        center: 'title',
        end: 'dayGridMonth dayGridWeek dayGridDay'
      },
      eventMouseEnter: (e) => {
        new Tooltip(e.el, {
          title: e.event.extendedProps.description,
          placement: 'top',
          trigger: 'hover',
          container: 'body'
        });        

      },
      editable: false,
    };
  }

  optionsL() {
    this.optionsList = {
      plugins: [ listPlugin ],
      initialDate: new Date(),
      initialView: 'listWeek',
      locale: esLocale,
      headerToolbar: {
        left: '',
        center: 'title',
        right: ''
      },
      editable: true
    };
  }

}
