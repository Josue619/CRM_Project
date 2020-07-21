import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { Todo } from 'src/app/models/todoC';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  public todoTitle: string;
  public filter: string = 'all';
  public error = [];
  public form = {
    search: null,
    id: null,
  };

  constructor(public Service: FileService) { }

  ngOnInit(): void {
    this.todoTitle = '';
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.Service.addTodo(this.todoTitle);

    this.todoTitle = '';
  }

  getNotes(id: number) {
    this.Service.id_Client = id;
    console.log(id);
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

  handleError(error) {
    this.error = error.error.errors;
  }

}
