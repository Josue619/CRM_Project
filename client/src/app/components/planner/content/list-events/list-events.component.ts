import { Component, OnInit } from '@angular/core';
import { DdrBlockItem, DdrAction } from 'ddr-block-list';
import { Router } from '@angular/router';
import { Event } from '../../../../models/event.model';
import { PlannerService } from 'src/app/services/planner.service';
import Swal from 'sweetalert2';

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

  public error = [];

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
        
      },

      error => this.handleError(error)
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
        this.showModalDelete($event.item.id, $event);        
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

  deleteEvent(id: string, $event) {
    return this.eventService.deleteEvent(id, $event.item).subscribe(
      data => this.handleResponse($event),
      error => this.handleError(error)
    );
  }

  showModalDelete(id: string, $event) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar este evento?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'El evento ha sido removido.',
          'success'
        )
        this.deleteEvent(id, $event);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha realizado ningún cambio',
          'error'
        )
        this.router.navigateByUrl('/list-events');
      }
    })
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

  handleResponse($event) {
    let index = this.blockItems.findIndex(block => block.item.id === $event.item.id);
    this.blockItems.splice(index, 1);
    this.blockItems = [];
    this.getEvents();
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModal();
  }

}
