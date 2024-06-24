import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
@AutoUnsub()
export class SignupComponent implements OnInit {
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
  });
  isSuccessful = false;

  constructor(private authService: AuthService, private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['app-login']);
  }

  submitForm() {
    if (
      this.signupForm.value.email &&
      this.signupForm.value.password &&
      this.signupForm.value.username
    ) {
      const id = new Date().getTime().toString();
      const user: IUser = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        username: this.signupForm.value.username,
        id: id,
      };
      this.authService.signup(user).subscribe({
        next: (res) => {
          if (res === 'Signup successful') {
            this.isSuccessful = true;
            this.router.navigate(['/app-login']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  ngOnInit(): void {}
}
