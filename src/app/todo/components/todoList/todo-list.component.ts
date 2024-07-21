import { Component, Inject, OnInit } from '@angular/core';
import { ITask } from '../../models/todo.interface';
import { TaskService } from '../../services/todo.services';
import { Router, RouterLink } from '@angular/router';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import { AuthService } from '../../../auth/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
@AutoUnsub()
export class TodoListComponent implements OnInit {
  tasks: ITask[] = [];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: (tasks: ITask[]) => {
        this.tasks = tasks;
      },
    });
  }
  ngOnInit(): void {
    if (this.authService.getIsUser()) {
      this.taskService
        .getTasks(
          JSON.parse(this.document.defaultView?.localStorage.getItem('user')!)
            ._id
        )
        .subscribe({
          next: (tasks: ITask[]) => {
            this.tasks = tasks;
          },
        });
    }
  }
}
