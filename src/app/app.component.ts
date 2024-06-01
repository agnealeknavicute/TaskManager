import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TodoListComponent } from './todo/components/todoList/todoList.component';
import { TodoAddingComponent } from './todo/components/todoAdding/todoAdding.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSlideToggleModule,
    TodoListComponent,
    TodoAddingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-manager';
  handleToggle() {
    console.log('Toggle triggered');
  }
}
