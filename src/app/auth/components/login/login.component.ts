import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutoUnsub } from '../../../core/decorators/auto-unsub.decorator';
import { TaskService } from '../../../todo/services/todo.services';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
@AutoUnsub()
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  submitForm() {}

  ngOnInit(): void {}
}
