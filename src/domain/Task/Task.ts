import { v4 as uuid } from 'uuid';
import { TaskStatus } from './TaskStatus';

export interface TaskData {
  listId: string;
  description: string;
  status?: TaskStatus;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task {
  public readonly id: string;
  public readonly listId: string;

  private _status: TaskStatus;

  get status() {
    return this._status;
  }

  private _description: string;

  get description() {
    return this._description;
  }

  set description(description: string) {
    if (description.length < 3) {
      throw new Error('Task description must be at least 3 characters.');
    }
    this._description = description;
  }
  
  private _createdAt: Date;

  get createdAt() {
    return this._createdAt;
  }

  private _updatedAt: Date;

  get updatedAt() {
    return this._updatedAt;
  }

  constructor({
    listId,
    description,
    createdAt = new Date(),
    updatedAt = new Date(),
    status = TaskStatus.PENDING,
    id = uuid(),
  }: TaskData) {
    this.id = id;
    this.listId = listId;
    this.description = description;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // Method to update task details
  public updateDetails({
    description,
    status,
  }: Partial<Pick<Task, 'description' | 'status'>>) {
    if (description !== undefined) {
      this.description = description;
    }

    if (status !== undefined) {
      this._status = status;
    }

    this._updatedAt = new Date();
  }
}
