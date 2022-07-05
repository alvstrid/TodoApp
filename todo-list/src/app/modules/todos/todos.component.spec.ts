import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosComponent } from './todos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosService } from '../../core/services/todos.service';
import { of } from 'rxjs';
import { ToDoModel } from '../../core/models/todo.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let todo1;
  let todo2;
  const todoList = [
    todo1 = {
      title: 'Task 1',
      about: 'description 1'
    },
    todo2 = {
      title: 'Task 1',
      about: 'description 1'
    }
  ];
  const newTodoTitle = 'newtodo';
  const newTodoAbout = 'newtodo';

  const mockTodoService = {
    createTodo: jasmine.createSpy('createTodo').and.returnValue(of('')),
    getTodos: jasmine.createSpy('getTodos').and.returnValue(of(todoList)),
    deleteTodo: jasmine.createSpy('deleteTodo').and.returnValue(of('')),
    updateTodo: jasmine.createSpy('updateTodo').and.returnValue(of(''))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodosComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TodosService, useValue: mockTodoService },
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TodosComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a todo', () => {
    component.deleteTodo('1');
    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith('1');
  });

  it('should fetch todos', () => {
    component.getTodos();
    expect(mockTodoService.getTodos).toHaveBeenCalled();
    expect(component.todos.length).toEqual(2);
  });

  it('should update a todo', () => {
    const updatedTodo: ToDoModel = {
      title: 'updatedtodo',
      about: 'updatedtodo',
      id: '1'
    }
    component.updateTodo(updatedTodo);
    expect(mockTodoService.updateTodo).toHaveBeenCalledWith(updatedTodo);
  });

  it('create a todo', () => {
    component.todoForm.value.title = newTodoTitle ;
    component.todoForm.value.about = newTodoAbout;
    component.onSubmit();
    expect(mockTodoService.createTodo).toHaveBeenCalled();
  });
});
