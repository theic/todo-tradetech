import { Task } from '../Task/Task';

export interface List {
  id: string;
  title: string;
  tasks: Task[];
  createdAt?: Date;
}
