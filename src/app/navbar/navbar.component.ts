import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AutoUnsub } from '../core/decorators/auto-unsub.decorator';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { IUser } from '../auth/models/user.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
@AutoUnsub()
export class NavbarComponent implements OnInit {
  isUser: boolean = true;
  userData: IUser | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    this.authService.logOut();
    this.router.navigate(['app-login']);
  }

  ngOnInit(): void {
    this.authService.getIsUserObservable().subscribe((isUser) => {
      this.isUser = isUser;
      this.userData = this.authService.getUserData();
    });
  }
}
