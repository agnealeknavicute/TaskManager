import { Routes } from '@angular/router';
import { TodoAddingComponent } from './todo/components/todoAdding/todo-adding.component.';
import { TodoListComponent } from './todo/components/todoList/todo-list.component';
import { TodoItemComponent } from './todo/components/todoItem/todo-item.component';

export const routes: Routes = [
  { path: 'app-todo-add-component', component: TodoAddingComponent },
  { path: 'app-todo-list-component', component: TodoListComponent },
  { path: 'app-todo-item-component/:id', component: TodoItemComponent },
];
