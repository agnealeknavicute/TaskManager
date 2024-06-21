import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { constants } from '../../core/constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;

  constructor(private http: HttpClient) {
    if (document.cookie) {
      debugger;
      this.authenticated = true;
    } else {
      debugger;
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }

  login(data: Omit<IUser, 'username'>): Observable<Omit<IUser, 'password'>> {
    return this.http.post<Omit<IUser, 'password'>>(
      environment.apiUrl + constants.LOGIN,
      data
    );
  }
  signup(data: Omit<IUser, ''>): Observable<Omit<IUser, 'password'>> {
    return this.http.post<Omit<IUser, 'password'>>(
      environment.apiUrl + constants.SIGNUP,
      data
    );
  }
}
