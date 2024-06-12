import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../models/todo.interface';
import { Observable, catchError, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  constructor(private http: HttpClient) {}
  get(url: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(url);
  }
  getTask(url: string, id: number): Observable<ITask> {
    return this.http.get<ITask[]>(url + `/${id}`).pipe(
      map((response) => {
        return response[0];
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }
  post(url: string, data: ITask): Observable<ITask> {
    return this.http.post<ITask>(url, data);
  }
  deleteTask(url: string, id: number): Observable<ITask[]> {
    return this.http.get<ITask[]>(url + `/${id}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
