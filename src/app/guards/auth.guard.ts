import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getIsUserObservable();
  }
}

export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (
      this.authService.getIsUserObservable() &&
      this.authService.getUserData()?.role === 'admin'
    ) {
      this.router.navigate(['app-todo-list-component']);
      debugger;
      return true;
    } else {
      debugger;
      return true;
    }
  }
}
