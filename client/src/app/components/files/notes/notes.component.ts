import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todoC';
import { FileService } from 'src/app/services/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() todo: Todo;

  public error = [];
  public beforeEdit: string = '';
  
  constructor(public Service: FileService) { }

  ngOnInit(): void {
  }

  getNotes(): Todo[] {
    this.Service.getNotes(this.Service.id_Client.toString()).subscribe(
      (result: any) => { this.Service.todos = result },
      error => this.handleError(error)
    );
    return this.Service.todos;
  }

  editNote(note: Todo): void {
    this.beforeEdit = note.title;
    note.editing = true;
  }

  doneEdit(note: Todo): void {
    if (note.title.trim().length == 0) {
      note.title = this.beforeEdit;
    }
    
    this.Service.anyRemainingModel = this.Service.anyRemaining();
    note.editing = false;
    this.updateNote(note);
  }

  updateNote(note: Todo) {
    delete note.editing;
    delete note.created_at;

    this.Service.updateNote(note.id, note).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  deleteNote(note: Todo) {
    return this.Service.deleteNote(note.id, note).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  showModalDelete(note: Todo) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar la nota?',
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
          'La nota ha sido removida.',
          'success'
        )
        this.deleteNote(note);
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

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEdit;
    todo.editing = false;
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
    this.getNotes();
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModal();
  }

}
