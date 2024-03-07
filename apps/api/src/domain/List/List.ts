import { Task } from '@domain/Task';
import { v4 as uuid } from 'uuid';

export interface ListData {
  title: string;
  userId: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tasks?: Task[];
}

export class List {
  public readonly id: string;
  public readonly userId: string;

  private _title: string;

  get title() {
    return this._title;
  }

  private _createdAt: Date;

  get createdAt() {
    return this._createdAt;
  }

  private _updatedAt: Date;

  get updatedAt() {
    return this._updatedAt;
  }

  private _tasks: Task[];

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }

  constructor({
    title,
    userId,
    id = uuid(),
    createdAt = new Date(),
    updatedAt = new Date(),
    tasks = [],
  }: ListData) {
    this.id = id;
    this.userId = userId;
    this._title = title;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._tasks = tasks;
  }

  public updateDetails({
    title,
  }: Partial<Pick<List, 'title'>>) {
    if (title !== undefined) {
      this._title = title;
    }
    
    this._updatedAt = new Date();
  }
}
