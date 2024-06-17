import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../models/todo.interface';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from '../../../environment/environment';
import { constants } from '../../core/constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  constructor(private http: HttpClient) {}
  getTasksApi(): Observable<ITask[]> {
    return this.http.get<ITask[]>(environment.apiUrl + constants.GET_NOTES_URL);
  }
  getTaskApi(id: number): Observable<ITask> {
    return this.http
      .get<ITask[]>(environment.apiUrl + constants.GET_NOTE_URL + `/${id}`)
      .pipe(
        map((response) => {
          return response[0];
        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }
  postTaskApi(data: ITask): Observable<ITask> {
    return this.http.post<ITask>(
      environment.apiUrl + constants.GET_NOTE_URL,
      data
    );
  }
  deleteTaskApi(id: number): Observable<ITask[]> {
    return this.http.get<ITask[]>(
      environment.apiUrl + constants.DELETE_NOTE + `/${id}`
    );
  }
  updateTaskApi(
    id: number,
    data: Pick<ITask, 'title' | 'description' | 'type'>
  ): Observable<ITask> {
    return this.http.post<ITask>(
      environment.apiUrl + constants.UPDATE_NOTE + `/${id}`,
      data
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
