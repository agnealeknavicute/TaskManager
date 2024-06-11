import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../../models/todo.interface';
import { TaskService } from '../../services/todo.services';
import { RouterLink } from '@angular/router';
import { TaskApiService } from '../../services/task-api.service';
import { error } from 'console';

@Component({
  selector: 'mc-todolist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.scss'],
})
export class TodoListComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(private taskService: TaskService) {}
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: (tasks: ITask[]) => {
        this.tasks = tasks;
      },
    });
  }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: ITask[]) => {
        this.tasks = tasks;
      },
    });
  }
}
