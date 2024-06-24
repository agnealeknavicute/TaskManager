export enum TaskTypes {
  HighUrgency = 'High Urgency',
  MediumUrgency = 'Medium Urgency',
  LowUrgency = 'Low Urgency',
}
export enum TaskStatus {
  Done = 'done',
  InProgress = 'in progress',
  NotStarted = 'not started',
}

export interface ITask {
  userId: string;
  id: number;
  title: string;
  description: string;
  type: TaskTypes;
  date: string | null;
  status: TaskStatus;
}

export type ITaskList = ITask[];
