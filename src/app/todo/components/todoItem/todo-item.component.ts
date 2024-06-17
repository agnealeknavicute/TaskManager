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
import { TodoEditItemComponent } from '../todo-edit-item/todo-edit-item.component';

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
  editMode: boolean = false;
  editForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    rawType: new FormControl(2),
  });
  result: any = '';

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
      }),
      tap((task) => {
        if (task) {
          this.editForm.patchValue({
            title: task.title,
            description: task.description,
            rawType: 2,
          });
        }
      })
    );
  }
  openDialog() {
    this.taskItem$.subscribe((task) => {
      const dialogRef = this.dialog.open(TodoEditItemComponent, {
        width: '30%',
        data: this.editForm.value,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (result) {
          let type: TaskTypes = TaskTypes.MediumUrgency;
          switch (result.rawType) {
            case 1:
              type = TaskTypes.LowUrgency;
              break;
            case 2:
              type = TaskTypes.MediumUrgency;
              break;
            case 3:
              type = TaskTypes.HighUrgency;
              break;
          }
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
    });
  }

  isInvalid(controlName: string) {
    const control = this.editForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  setEditMode() {
    this.editMode = !this.editMode;
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
    this.taskItem$.subscribe((task) => {
      if (task) {
        let rawType = 1;
        switch (task.type) {
          case TaskTypes.HighUrgency:
            rawType = 3;
            break;
          case TaskTypes.MediumUrgency:
            rawType = 2;
            break;
          case TaskTypes.LowUrgency:
            rawType = 1;
            break;
        }
        this.editForm.patchValue({
          title: task.title,
          description: task.description,
          rawType: rawType,
        });
      }
    });
  }
}
