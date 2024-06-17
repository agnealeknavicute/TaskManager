import { Component, Inject } from '@angular/core';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { IEditData, TodoItemComponent } from '../todoItem/todo-item.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatSlider,
  MatSliderModule,
  MatSliderThumb,
} from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-todo-edit-item',
  standalone: true,
  templateUrl: './todo-edit-item.component.html',
  styleUrl: './todo-edit-item.component.scss',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogClose,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
@AutoUnsub()
export class TodoEditItemComponent {
  constructor(
    public dialogRef: MatDialogRef<TodoItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
