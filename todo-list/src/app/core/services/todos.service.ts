import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  constructor(
    private http: HttpClient
  ) {}

  getTodos() {
      return this.http.get<ToDoModel[]>('https://todos-project-b0767-default-rtdb.europe-west1.firebasedatabase.app/todos.json?print=pretty');
  }

  createTodo(todo: ToDoModel) {
    return this.http.post('https://todos-project-b0767-default-rtdb.europe-west1.firebasedatabase.app/todos.json', todo);
  }

  deleteTodo(id: string) {
    return this.http.delete(`https://todos-project-b0767-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`);
  }

  updateTodo(todo: ToDoModel) {
    return this.http.put(`https://todos-project-b0767-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo.id}.json`, todo);
  }
}
