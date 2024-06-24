import { Component } from '@angular/core';
import { ITask, TaskStatus, TaskTypes } from '../../models/todo.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/todo.services';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  templateUrl: './todo-adding.component.html',
  styleUrl: './todo-adding.component.scss',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
})
@AutoUnsub()
export class TodoAddingComponent implements Partial<ITask> {
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    rawType: new FormControl(2),
  });
  name = new FormControl('');
  id = 0;
  type = TaskTypes.LowUrgency;
  createdOn = null;
  status = TaskStatus.NotStarted;
  TaskTypes = TaskTypes;

  constructor(private router: Router, private taskService: TaskService) {}

  resetForm() {
    this.taskForm.reset({
      title: '',
      description: '',
      rawType: 2,
    });

    Object.keys(this.taskForm.controls).forEach((key) => {
      const control = this.taskForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }

  submitTask() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    const formattedYear = String(year).padStart(2, '0');

    const formattedDate = `${formattedDay}.${formattedMonth}.${formattedYear}`;
    const id = Date.now();

    switch (this.taskForm.value.rawType) {
      case 1:
        this.type = this.TaskTypes.LowUrgency;
        break;
      case 2:
        this.type = this.TaskTypes.MediumUrgency;
        break;
      case 3:
        this.type = this.TaskTypes.HighUrgency;
        break;
    }
    if (
      this.taskForm.value.title &&
      this.taskForm.value.description &&
      localStorage.getItem('user')
    ) {
      const userId = JSON.parse(localStorage.getItem('user')!)._id;

      const task: ITask = {
        userId: userId,
        id: id,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        type: this.type,
        date: formattedDate,
        status: this.status,
      };
      this.taskService.addTask(task).subscribe(() => {
        this.resetForm();
        this.id = 0;
        this.type = TaskTypes.MediumUrgency;
        this.status = TaskStatus.NotStarted;
        this.router.navigate(['app-todo-list-component']);
      });
    }
  }
}
