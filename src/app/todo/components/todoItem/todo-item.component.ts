import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, firstValueFrom, of } from 'rxjs';
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
  allUserUsernames: string[] = [];
  assignUsersMode: boolean = false;
  newAssignUsers: string[] = [];
  userRole: string = '';

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service: TaskService,
    private taskApi: TaskApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  deleteAssignUser(id: number, user: string) {
    this.taskApi.deleteAssignUserApi(id, user).subscribe({
      next: (newTask) => {
        this.taskItem$ = of(newTask);
        this.cdr.detectChanges();
      },
    });
  }

  handleOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.newAssignUsers.push(event.option.value);
  }

  addAssignUsers(id: number) {
    this.taskApi.addAssignUsersApi(id, this.newAssignUsers).subscribe({
      next: (newTask) => {
        this.taskItem$ = of(newTask);
        this.cdr.detectChanges();
      },
    });
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

  async ngOnInit(): Promise<void> {
    this.taskItem$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const taskId = Number(params.get('id'));
        return this.service.getTask(taskId);
      })
    );
    try {
      const allUsers = await firstValueFrom(this.authService.getUsers());
      this.allUserUsernames = allUsers.map((user) => user.username);
      const user = this.authService.getUserData();
      if (user) {
        this.userRole = user.role;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
