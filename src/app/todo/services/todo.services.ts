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
    return this.taskApi.get('http://localhost:3001/api/todos');
  }

  addTask(task: ITask): void {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }
  deleteTask(id: number): Observable<ITask[]> {
    return this.taskApi.deleteTask('http://localhost:3001/api/todoDelete', id);
  }
  getTask(id: number): Observable<ITask | null> {
    const foundTask = this.tasks.find((task) => task.id === id);
    return of(foundTask || null);
  }
}
