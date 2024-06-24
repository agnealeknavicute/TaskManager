import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
@AutoUnsub()
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  redirectToSignup() {
    this.router.navigate(['app-signup']);
  }

  submitForm() {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService.login(user).subscribe({
        next: (res) => {
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

  ngOnInit(): void {}
}
