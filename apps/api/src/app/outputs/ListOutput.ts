import { List } from '@domain/List';
import { TaskOutput } from './TaskOutput';

export class ListOutput {
  public readonly id: string;
  public readonly title: string;
  public readonly tasks: TaskOutput[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: ListOutput) {
    Object.assign(this, data);
  }

  static fromList({
    id,
    title,
    tasks,
    createdAt,
    updatedAt,
  }: List) {
    return new ListOutput({
      id,
      title,
      tasks: tasks.map(TaskOutput.fromTask),
      createdAt,
      updatedAt,
    });
  }
}
