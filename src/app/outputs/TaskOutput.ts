import { Task } from '@domain/Task';

export class TaskOutput {
  public readonly id: string;
  public readonly listId: string;
  public readonly description: string;
  public readonly status: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: TaskOutput) {
    Object.assign(this, data);
  }

  static fromTask({
    id,
    listId,
    description,
    status,
    createdAt,
    updatedAt,
  }: Task) {
    return new TaskOutput({
      id,
      listId,
      description,
      status,
      createdAt,
      updatedAt,
    });
  }
}
