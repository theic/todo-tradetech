import { TaskService } from '@app/Task';
import { Task } from '@domain/Task';
import { injectable } from 'inversify';
@injectable()
export class FirestoreTaskService implements TaskService {
  getAllTasks(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
  createTask(task: Task): Promise<Task> {
    throw new Error('Method not implemented.');
  }
}
