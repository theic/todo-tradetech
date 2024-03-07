import { Task, TaskStatus } from '../../domain/Task';

export type CreateTaskType = {
  listId: string;
  description: string;
};

export type UpdateTaskType = {
  taskId: string;
  listId: string;
  description?: string;
  status?: TaskStatus;
};

export type DeleteTaskType = {
  taskId: string;
  listId: string;
};

export type TaskServiceType = {
  createTask: (params: CreateTaskType) => Promise<Task>;
  deleteTask: (params: DeleteTaskType) => Promise<void>;
  updateTask: (params: UpdateTaskType) => Promise<Task | null>;
};
