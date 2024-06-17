import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ITask } from '../models/todo.interface';
import { TaskApiService } from './task-api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];
  private tasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>(
    this.tasks
  );

  constructor(private taskApi: TaskApiService) {}

  getTasks(): Observable<ITask[]> {
    return this.taskApi.getTasksApi();
  }

  addTask(task: ITask): Observable<ITask> {
    return this.taskApi.postTaskApi(task);
  }
  deleteTask(id: number): Observable<ITask[]> {
    return this.taskApi.deleteTaskApi(id);
  }
  getTask(id: number): Observable<ITask | null> {
    return this.taskApi.getTaskApi(id);
  }
  updateTask(
    id: number,
    data: Pick<ITask, 'title' | 'description' | 'type'>
  ): Observable<ITask> {
    return this, this.taskApi.updateTaskApi(id, data);
  }
}
