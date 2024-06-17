import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from '../../services/todo.services';
import { ITask, TaskTypes } from '../../models/todo.interface';
import { switchMap, tap } from 'rxjs/operators';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TodoEditItemComponent } from '../todoEditItem/todo-edit-item.component';
import {
  rawTypeToRealType,
  realTypeToRawType,
} from '../../../helpers/rawType-helper';

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
  ],
})
@AutoUnsub()
export class TodoItemComponent implements OnInit {
  taskItem$: Observable<ITask | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service: TaskService
  ) {}

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
  }
}
