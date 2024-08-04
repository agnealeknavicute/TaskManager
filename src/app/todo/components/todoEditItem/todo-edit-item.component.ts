import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { IEditData, TodoItemComponent } from '../todoItem/todo-item.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  signal,
  Inject,
  Input,
} from '@angular/core';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TodoUserAssignComponent } from '../todoUserAssign/todo-user-assign.component';

@Component({
  selector: 'app-todo-edit-item',
  standalone: true,
  templateUrl: './todo-edit-item.component.html',
  styleUrl: './todo-edit-item.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogClose,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    TodoUserAssignComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
