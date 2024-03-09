import { Task } from '../Task';

export interface List {
  id: string;
  title: string;
  tasks: Task[];
  createdAt?: Date;
}
