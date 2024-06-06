import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from '../../services/todo.services';
import { ITask } from '../../models/todo.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'todo-item',
  standalone: true,
  templateUrl: './todoItem.component.html',
  styleUrl: './todoItem.component.scss',
  imports: [CommonModule, RouterLink],
})
export class TodoItemComponent implements OnInit {
  taskItem: Observable<ITask | null> = of(null);

  constructor(private route: ActivatedRoute, private service: TaskService) {}

  deleteTask(id: number) {
    this.service.deleteTask(id);
    this.taskItem = of(null);
  }

  ngOnInit(): void {
    this.taskItem = this.route.paramMap.pipe(
      switchMap((params) => {
        const taskId = Number(params.get('id'));
        return this.service.getTask(taskId);
      })
    );
  }
}
