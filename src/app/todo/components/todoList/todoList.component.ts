import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../../types/todo.interface';
import { TaskService } from '../../services/todo.services';

@Component({
  selector: 'mc-todolist',
  standalone: true,
  imports: [],
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.scss'],
})
export class TodoListComponent {
  tasks: ITask[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
}
