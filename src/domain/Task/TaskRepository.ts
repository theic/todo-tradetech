import { Task } from './Task';

export interface TaskRepository {
  add(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<void>;
}

export const TaskRepository = Symbol('TaskRepository');
