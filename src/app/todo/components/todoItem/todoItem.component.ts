import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from '../../services/todo.services';
import { ITask } from '../../models/todo.interface';
import { switchMap } from 'rxjs/operators';
import { TaskApiService } from '../../services/task-api.service';

@Component({
  selector: 'todo-item',
  standalone: true,
  templateUrl: './todoItem.component.html',
  styleUrl: './todoItem.component.scss',
  imports: [CommonModule, RouterLink],
})
export class TodoItemComponent implements OnInit {
  taskItem: Observable<ITask | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    private taskApi: TaskApiService,
    private service: TaskService
  ) {}

  deleteTask(id: number) {
    this.service.deleteTask(id).subscribe({
      next: (value) => {
        this.taskItem = of(null);
      },
    });
  }

  ngOnInit(): void {
    this.taskItem = this.route.paramMap.pipe(
      switchMap((params) => {
        const taskId = Number(params.get('id'));
        return this.taskApi.getTask(`http://localhost:3001/api/todo`, taskId);
      })
    );
  }
}
