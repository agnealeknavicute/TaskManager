import { TaskTypes } from '../todo/models/todo.interface';

export function rawTypeToRealType(rawType: 1 | 2 | 3): TaskTypes {
  switch (rawType) {
    case 1:
      return TaskTypes.LowUrgency;
    case 2:
      return TaskTypes.MediumUrgency;
    case 3:
      return TaskTypes.HighUrgency;
  }
}

export function realTypeToRawType(realType: TaskTypes): 1 | 2 | 3 {
  switch (realType) {
    case TaskTypes.LowUrgency:
      return 1;
    case TaskTypes.MediumUrgency:
      return 2;
    case TaskTypes.HighUrgency:
      return 3;
  }
}
