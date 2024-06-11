import { Routes } from '@angular/router';
import { TodoAddingComponent } from './todo/components/todoAdding/todoAdding.component';
import { TodoListComponent } from './todo/components/todoList/todoList.component';
import { TodoItemComponent } from './todo/components/todoItem/todoItem.component';

export const routes: Routes = [
  { path: 'todoAdd-component', component: TodoAddingComponent },
  { path: 'todoList-component', component: TodoListComponent },
  { path: 'todoItem-component/:id', component: TodoItemComponent },
];
