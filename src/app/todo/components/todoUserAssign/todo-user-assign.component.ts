import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import { MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  Input,
  Injectable,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-todo-user-assign',
  standalone: true,
  templateUrl: './todo-user-assign.component.html',
  styleUrl: './todo-user-assign.component.scss',
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@AutoUnsub()
export class TodoUserAssignComponent {
  @Input({ required: true }) allUsers: string[];
  @Output() optionSelected: EventEmitter<MatAutocompleteSelectedEvent> =
    new EventEmitter<MatAutocompleteSelectedEvent>();

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(event);
  }

  usersForExport: string[] = [];

  constructor() {
    this.allUsers = [];
  }
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentUser = model('');
  readonly users = signal<string[]>([]);

  readonly filteredUsers = computed(() => {
    const currentUser = this.currentUser().toLowerCase();
    return currentUser
      ? this.allUsers.filter((user) => user.toLowerCase().includes(currentUser))
      : this.allUsers.slice();
  });

  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.usersForExport;
    if (value) {
      this.users.update((users) => [...users, value]);
    }

    this.currentUser.set('');
  }

  remove(user: string): void {
    this.users.update((users) => {
      const index = users.indexOf(user);
      if (index < 0) {
        return users;
      }

      users.splice(index, 1);
      this.announcer.announce(`Removed ${user}`);
      return [...users];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.usersForExport.push(event.option.viewValue);

    this.users.update((users) => [...users, event.option.viewValue]);
    this.currentUser.set('');
    event.option.deselect();
  }
}
