import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { TaskService } from '../../services/todo.services';
import { ITask, TaskTypes } from '../../models/todo.interface';
import { switchMap } from 'rxjs/operators';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditItemComponent } from '../todoEditItem/todo-edit-item.component';
import {
  rawTypeToRealType,
  realTypeToRawType,
} from '../../../helpers/rawType-helper';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { TodoUserAssignComponent } from '../todoUserAssign/todo-user-assign.component';
import { AuthService } from '../../../auth/services/auth.service';
import { TaskApiService } from '../../services/task-api.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Roles } from '../../../auth/models/user.interface';

export interface IEditData {
  title: string;
  description: string;
  rawType: number;
}

@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  imports: [
    RouterLink,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    TodoUserAssignComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@AutoUnsub()
export class TodoItemComponent implements OnInit {
  taskItem$: Observable<ITask | null> = of(null);
  readonly panelOpenState = signal(false);
  allUserUsernames$: Observable<string[]> = of([]);
  assignUsersMode: boolean = false;
  newAssignUsers: string[] = [];
  userRoles: Roles[] = [];
  Roles = Roles;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service: TaskService,
    private taskApi: TaskApiService,
    private authService: AuthService
  ) {}

  deleteAssignUser(id: number, user: string) {
    this.taskItem$ = this.taskApi.deleteAssignUserApi(id, user);
  }

  handleOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.newAssignUsers.push(event.option.value);
  }

  addAssignUsers(id: number) {
    this.taskItem$ = this.taskApi.addAssignUsersApi(id, this.newAssignUsers);
  }
  changeAssignUsersMode() {
    this.assignUsersMode = !this.assignUsersMode;
  }
  loadTask(): void {
    this.taskItem$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const taskId = Number(params.get('id'));
        return this.service.getTask(taskId);
      })
    );
  }

  openDialog() {
    this.taskItem$.subscribe((task) => {
      if (task) {
        const rawType = realTypeToRawType(task.type);
        const dialogRef = this.dialog.open(TodoEditItemComponent, {
          width: '30%',
          data: {
            title: task.title,
            description: task.description,
            rawType: rawType,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          if (result) {
            let type: TaskTypes = rawTypeToRealType(result.rawType);

            const taskId = Number(this.route.snapshot.paramMap.get('id'));

            this.service
              .updateTask(taskId, {
                title: result.title,
                description: result.description,
                type: type,
              })
              .subscribe(() => {
                this.loadTask();
              });
          }
        });
      }
    });
  }

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
    this.allUserUsernames$ = this.authService
      .getUsers()
      .pipe(map((users) => users.map((user) => user.username)));
    const user = this.authService.getUserData();
    if (user) {
      this.userRoles = user.roles;
    }
  }
}
