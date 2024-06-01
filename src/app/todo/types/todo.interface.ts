export enum TaskTypes {
  HighUrgency = 'High Urgency',
  MediumUrgency = 'Medium Urgency',
  LowUrgency = 'Low urgency',
}
export enum TaskStatus {
  Done = 'done',
  InProgress = 'in progress',
  NotStarted = 'not started',
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  type: TaskTypes;
  createdOn: string | null;
  status: TaskStatus;
}

export type ITaskList = ITask[];
