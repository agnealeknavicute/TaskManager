import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { constants } from '../../core/constants/app-constants';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storageSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.getIsUser()
  );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}

  setIsUser(value: boolean): void {
    localStorage.setItem('isUser', value.toString());
    this.storageSub.next(value);
  }

  getIsUser(): boolean {
    if (typeof this.document.defaultView?.localStorage !== 'undefined') {
      return (
        this.document.defaultView?.localStorage.getItem('isUser') === 'true'
      );
    } else {
      return false;
    }
  }

  logOut(): void {
    localStorage.removeItem('isUser');
    localStorage.removeItem('user');
    this.storageSub.next(false);
  }

  getUserData(): IUser | null {
    if (
      typeof this.document.defaultView?.localStorage !== 'undefined' &&
      this.document.defaultView?.localStorage.getItem('user')
    ) {
      return JSON.parse(
        this.document.defaultView?.localStorage.getItem('user')!
      );
    } else {
      return null;
    }
  }

  getIsUserObservable(): Observable<boolean> {
    return this.storageSub.asObservable();
  }

  login(
    data: Omit<IUser, 'username' | 'id'>
  ): Observable<Omit<IUser, 'password'>> {
    return this.http.post<Omit<IUser, 'password'>>(
      environment.apiUrl + constants.LOGIN,
      data
    );
  }
  signup(data: Omit<IUser, ''>): Observable<string> {
    return this.http.post<string>(environment.apiUrl + constants.SIGNUP, data);
  }
}
