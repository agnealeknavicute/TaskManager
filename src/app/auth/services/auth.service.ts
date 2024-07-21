import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { constants } from '../../core/constants/app-constants';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storageSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.getIsUser()
  );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private router: Router
  ) {}

  setIsUser(value: boolean): void {
    localStorage.setItem('isUser', value.toString());
    this.storageSubj.next(value);
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
    this.storageSubj.next(false);
    this.router.navigate(['app-login']);
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
    return this.storageSubj.asObservable();
  }

  login(
    data: Omit<IUser, 'username' | 'id' | 'role'>
  ): Observable<Omit<IUser, 'password'>> {
    return this.http.post<Omit<IUser, 'password'>>(
      environment.apiUrl + constants.LOGIN,
      data
    );
  }
  signup(data: IUser): Observable<Omit<IUser, 'password'>> {
    return this.http.post<Omit<IUser, 'password'>>(
      environment.apiUrl + constants.SIGNUP,
      data
    );
  }
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.apiUrl + constants.GET_USERS);
  }
}
