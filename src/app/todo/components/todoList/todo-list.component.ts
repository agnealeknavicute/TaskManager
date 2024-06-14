import { Component, OnInit } from '@angular/core';
import { ITask } from '../../models/todo.interface';
import { TaskService } from '../../services/todo.services';
import { RouterLink } from '@angular/router';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
@AutoUnsub()
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
