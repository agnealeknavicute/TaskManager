import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ITask } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];
  private tasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>(
    this.tasks
  );

  constructor() {}

  getTasks(): Observable<ITask[]> {
    console.log(this.tasks);
    return this.tasksSubject.asObservable();
  }

  addTask(task: ITask): void {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }
  deleteTask(id: number): void {
    const updatedTasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = updatedTasks;
    this.tasksSubject.next(this.tasks);
  }
  getTask(id: number): Observable<ITask | null> {
    const foundTask = this.tasks.find((task) => task.id === id);
    return of(foundTask || null);
  }
}
