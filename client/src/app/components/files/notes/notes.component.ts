import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todoC';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() todo: Todo;

  public beforeEdit: string = '';
  
  constructor(public Service: FileService) { }

  ngOnInit(): void {
  }

  editTodo(todo: Todo): void {
    this.beforeEdit = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEdit;
    }

    this.Service.anyRemainingModel = this.Service.anyRemaining();
    todo.editing = false;

  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEdit;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    
  }

}
