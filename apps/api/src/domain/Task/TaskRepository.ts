import { Task } from './Task';

export interface TaskRepository {
  save(task: Task): Promise<void>;
  get(id: string): Promise<Task | undefined>;
  delete(id: string): Promise<void>;
}

export const TaskRepository = Symbol('TaskRepository');
