import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from '../../services/todo.services';
import { ITask } from '../../models/todo.interface';
import { switchMap } from 'rxjs/operators';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';

@Component({
  selector: 'todo-item',
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  imports: [CommonModule, RouterLink],
})
@AutoUnsub()
export class TodoItemComponent implements OnInit {
  taskItem$: Observable<ITask | null> = of(null);

  constructor(private route: ActivatedRoute, private service: TaskService) {}

  deleteTask(id: number) {
    this.service.deleteTask(id).subscribe({
      next: () => {
        this.taskItem$ = of(null);
      },
    });
  }

  ngOnInit(): void {
    this.taskItem$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const taskId = Number(params.get('id'));
        return this.service.getTask(taskId);
      })
    );
  }
}
