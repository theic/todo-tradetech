import { Task } from '@domain/Task';

export interface TaskService {
  getAllTasks(): Promise<Task[]>;
  createTask(task: Task): Promise<Task>;
}

export const TaskService = Symbol('TaskService');
