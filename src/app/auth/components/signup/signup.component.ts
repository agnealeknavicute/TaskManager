import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
@AutoUnsub()
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

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
      this.authService.signup(user).subscribe((res) => {});
    }
  }

  ngOnInit(): void {}
}
