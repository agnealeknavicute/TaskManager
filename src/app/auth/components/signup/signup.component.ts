import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser, Roles } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
@AutoUnsub()
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    role: new FormControl([Roles.user], [Validators.required]),
  });
  isSuccessful = false;

  constructor(private authService: AuthService, private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  submitForm() {
    if (
      this.signupForm.value.email &&
      this.signupForm.value.password &&
      this.signupForm.value.username &&
      this.signupForm.value.role
    ) {
      const id = new Date().getTime().toString();
      const user: IUser = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        username: this.signupForm.value.username,
        roles: this.signupForm.value.role,
        id: id,
      };
      this.authService.signup(user).subscribe({
        next: (res) => {
          this.isSuccessful = true;
          localStorage.setItem('user', JSON.stringify(res));
          this.authService.setIsUser(true);
          this.router.navigate(['app-todo-list-component']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
