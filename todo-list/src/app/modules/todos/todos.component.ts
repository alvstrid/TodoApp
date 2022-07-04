import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../core/services/todos.service';
import { ToDoModel } from '../../core/models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: [ './todos.component.scss' ]
})
export class TodosComponent implements OnInit {
  todos: ToDoModel[] =[];
  todoForm: FormGroup;
  index: any;

  constructor(
    private formBuilder: FormBuilder,
    private todosService: TodosService,
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: [ '', [ Validators.required ] ],
      about: [ '', [ Validators.required ] ]
    });
    this.getTodos();
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }
    let requestObject: ToDoModel = {
      title: this.todoForm.value.title,
      about: this.todoForm.value.about
    }
    this.todosService.createTodo(requestObject).subscribe( () => {
      this.getTodos();
    });
  }

  getTodos() {
    this.todosService.getTodos().subscribe(response => {
      if (response !== null){
        this.todos = Object.keys(response).map(id => {
          // @ts-ignore
          return { id: id, ...response[id] }});
      } else {
        this.todos = [];
      }
    });
  }

  deleteTodo(todoId: string) {
      this.todosService.deleteTodo(todoId).subscribe( () => {
        this.getTodos();
      });
  }

  updateTodo(todo: ToDoModel) {
    this.index = 0;
    this.todosService.updateTodo(todo).subscribe();
  }
}
