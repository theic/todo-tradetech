import { useState } from 'react';
import { List, ListStoreType } from '../../domain/List';
import { Task } from '../../domain/Task';

export function useListStore(): ListStoreType {
  const [lists, setLists] = useState<List[]>([]);

  return {
    lists,
    setLists,
    getLists: () => lists,
    addList: (list: List) => {
      setLists([list, ...lists]);
    },
    removeList: (listId: string) => {
      setLists(lists.filter(list => list.id !== listId));
    },
    updateList: (listId: string, newTitle: string) => {
      setLists(lists.map(list =>
        list.id === listId ? { ...list, title: newTitle } : list
      ));
    },
    addTask: (task: Task) => {
      setLists(lists.map(list =>
        list.id === task.listId
          ? { ...list, tasks: [...list.tasks, task] }
          : list
      ));
    },
    removeTask: (listId: string, taskId: string) => {
      setLists(lists.map(list =>
        list.id === listId ? { ...list, tasks: list.tasks.filter(current => current.id !== taskId) } : list
      ));
    },
    updateTask: (task: Task) => {
      setLists(lists.map(list =>
        list.id === task.listId ? {
          ...list, tasks: list.tasks.map(current =>
            current.id === task.id ? { ...current, status: task.status, description: task.description } : current
          )
        } : list
      ));
    },
    getTask: (listId: string, taskId: string) => {
      const currentList = lists.find(list => list.id === listId);
      const currentTask = currentList?.tasks?.find(task => task.id === taskId);
      return currentTask;
    },
  }
}
