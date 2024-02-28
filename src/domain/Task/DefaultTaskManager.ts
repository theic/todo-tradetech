import { inject, injectable } from 'inversify';
import { TaskRepository } from './TaskRepository';
import { CreateTaskData, TaskManager, UpdateTaskData } from './TaskManager';
import { Task } from './Task';

@injectable()
export class DefaultTaskManager implements TaskManager {
  constructor(
    @inject(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  public async create(listId: string, data: CreateTaskData): Promise<Task> {
    const task = new Task({
      listId,
      ...data,
    });
    await this.taskRepository.save(task);
    return task;
  }

  public async update(
    id: string,
    data: UpdateTaskData,
  ): Promise<Task> {
    const task = await this.taskRepository.get(id);
    task.updateDetails({ ...data });
    await this.taskRepository.save(task);
    return task;
  }

  public async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
