import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { Todo } from 'src/app/models/todoC';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css'],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)'}),
        animate(200, style({opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({opacity: 0, transform: 'translateY(30px)'}))
      ])

    ])
  ]
})
export class ListNotesComponent implements OnInit {

  public todoTitle: string;
  public filter: string = 'all';
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  public note: Todo = {
    id: 0,
    id_Client: null,
    title: '',
    completed: false,
    editing: false
  };

  constructor(public Service: FileService) { }

  ngOnInit(): void {
    this.todoTitle = '';
  }

  getNotes(id: number): Todo[] {
    this.Service.id_Client = id;
    this.Service.getNotes(id.toString()).subscribe(
      (result: any) => { this.Service.todos = result },
      error => this.handleError(error)
    );
    return this.Service.todos;
  }

  addTodo(): void {
    delete this.note.id;
    delete this.note.editing;
    delete this.note.created_at;

    this.note.id_Client = this.Service.id_Client;
    this.Service.addNote(this.note).subscribe(
      result => this.handleResponse(result),
      error => this.handleError(error)
    );

    this.note.title = '';
  }

  todosFiltered(): Todo[] {
    if (this.filter == 'all') {
      return this.Service.todos;
    } else if (this.filter == 'active') {
      return this.Service.todos.filter(todo => !todo.completed);
    } else if (this.filter == 'completed') {
      return this.Service.todos.filter(todo => todo.completed);
    }
    return this.Service.todos;
  }

  atLeastOneCompleted(): boolean {
    return this.Service.todos.filter(todo => todo.completed).length > 0;
  }

  checkAllNotes(): void {
    const checkedTodo = (<HTMLInputElement>event.target).checked;
    this.Service.anyRemainingModel = this.Service.anyRemaining();

    this.Service.checkAllNotes(this.Service.id_Client, checkedTodo).subscribe(
      data => this.checkAll(checkedTodo),
      error => this.handleError(error)
    );
    
  }

  checkAll(checkedTodo: boolean) {
    this.Service.todos.forEach(todo => todo.completed = checkedTodo);
    this.Service.anyRemainingModel = this.Service.anyRemaining();
  }

  clearCompleted() {
    const id = this.Service.id_Client;
    const completed = this.Service.todos.filter(todo => todo.completed).map(todo => todo.id)

    return this.Service.clearCompleted(id, completed).subscribe(
      data => this.comleted(),
      error => this.handleError(error)
    );
  }

  comleted() {
    this.Service.todos = this.Service.todos.filter(todo => !todo.completed);
  }

  showModalDelete(service: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar las notas seleccionadas?',
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
          'Las notas fueron eliminasdas.',
          'success'
        )
        this.clearCompleted();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha realizado ningún cambio',
          'error'
        )
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

  handleResponse(result) {
    this.note = {};  
    this.getNotes(this.Service.id_Client);
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModal();
  }

}
