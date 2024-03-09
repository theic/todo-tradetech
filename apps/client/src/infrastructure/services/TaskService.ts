import {
  CreateTaskType,
  DeleteTaskType,
  TaskServiceType,
  UpdateTaskType,
} from '../../application/Task';
import { Task } from '../../domain/Task';
import { BaseService } from './BaseService';

export function useTaskService(): TaskServiceType {
  return {
    createTask: async ({
      listId,
      description,
    }: CreateTaskType): Promise<Task> => {
      const response = await BaseService.post(`/lists/${listId}/tasks/create`, { description });
      return response.data;
    },
    deleteTask: async ({
      taskId,
      listId,
    }: DeleteTaskType): Promise<void> => {
      await BaseService.delete(`/lists/${listId}/tasks/${taskId}/delete`);
    },
    updateTask: async ({
      taskId,
      listId,
      ...updateData
    }: UpdateTaskType): Promise<Task | null> => {
      if (!updateData) {
        console.warn('No data provided to updateTask');
        return null
      }
      const response = await BaseService.patch(`/lists/${listId}/tasks/${taskId}/update`, updateData);
      return response.data;
    },
  }
}
