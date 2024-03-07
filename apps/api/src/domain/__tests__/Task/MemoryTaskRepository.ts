import { Task, TaskRepository } from '@domain/Task';

export class MemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async save(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async get(id: string): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }
  
  async delete(id: string): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
