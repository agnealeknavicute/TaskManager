import { Component } from '@angular/core';
import { ITask, TaskStatus, TaskTypes } from '../../types/todo.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/todo.services';

@Component({
  selector: 'todo-add',
  standalone: true,
  templateUrl: './todoAdding.component.html',
  styleUrl: './todoAdding.component.scss',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
  ],
})
export class TodoAddingComponent implements ITask {
  id = 0;
  title = '';
  description = '';
  type = TaskTypes.LowUrgency;
  createdOn = null;
  status = TaskStatus.NotStarted;
  TaskTypes = TaskTypes;

  constructor(private taskService: TaskService) {}

  handleSliderChange(event: Event) {
    switch ((event.target as HTMLInputElement).value) {
      case '1':
        this.type = this.TaskTypes.LowUrgency;
        break;
      case '2':
        this.type = this.TaskTypes.MediumUrgency;
        break;
      case '3':
        this.type = this.TaskTypes.HighUrgency;
        break;
    }
  }
  handleTitleChange(title: string) {
    this.title = title;
  }
  handleDescriptionChange(description: string) {
    this.description = description;
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

    const task: ITask = {
      id: id,
      title: this.title,
      description: this.description,
      type: this.type,
      createdOn: formattedDate,
      status: this.status,
    };
    console.log(task);
    this.taskService.addTask(task);
  }
}
