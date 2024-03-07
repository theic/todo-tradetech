import { Task, TaskData } from './Task';

export interface CreateTaskData extends Pick<TaskData, 'description' | 'status'> {
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
}

export interface TaskManager {
  create(listId: string, data: CreateTaskData): Promise<Task>;
  update(id: string, data: UpdateTaskData): Promise<Task>;
  delete(id: string): Promise<void>;
}

export const TaskManager = Symbol('TaskManager');
