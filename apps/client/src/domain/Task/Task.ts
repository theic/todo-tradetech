export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface Task {
  id: string;
  listId: string;
  description: string;
  status: TaskStatus;
}
