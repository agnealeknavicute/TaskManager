import { Routes } from '@angular/router';
import { TodoAddingComponent } from './todo/components/todoAdding/todo-adding.component.';
import { TodoListComponent } from './todo/components/todoList/todo-list.component';
import { TodoItemComponent } from './todo/components/todoItem/todo-item.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'app-todo-add-component',
    component: TodoAddingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-todo-list-component',
    component: TodoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-todo-item-component/:id',
    component: TodoItemComponent,
    canActivate: [AuthGuard],
  },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-signup', component: SignupComponent },
];
