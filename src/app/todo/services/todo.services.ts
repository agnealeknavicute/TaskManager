import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITask } from '../types/todo.interface';

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
}
