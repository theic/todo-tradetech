import { List } from './List';
import { Task } from '../Task';

export type ListStoreType = {
  lists: List[];
  getLists: () => List[];
  addList: (list: List) => void;
  removeList: (listId: string) => void;
  updateList: (listId: string, newTitle: string) => void;
  addTask: (task: Task) => void;
  removeTask: (listId: string, taskId: string) => void;
  updateTask: (task: Task) => void;
  getTask: (listId: string, taskId: string) => Task | undefined;
};
