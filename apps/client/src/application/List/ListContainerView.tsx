import { useEffect, useState } from 'react';
import { TaskStatus } from '../../domain';
import { useListService, useTaskService } from '../../infrastructure/services';
import { useUser } from '../User/UserProvider';
import { useListStore } from '../../infrastructure/store/ListStore';
import ListView from './ListView';

export function ListContainerView() {
  const { user, logout } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const {
    lists,
    addList,
    removeList,
    updateList,
    addTask,
    removeTask,
    updateTask,
    getTask,
  } = useListStore();
  const [newListTitle, setNewListTitle] = useState('');
  const listService = useListService();
  const taskService = useTaskService();

  useEffect(() => {
    if (user?.idToken) {
      
      listService.getLists().then((lists) => {
        lists.forEach((list) => addList(list));
      });
    }
  }, [user?.idToken])

  async function handleCreateList() {
    setIsLoading(true);
    const newList = await listService.createList({ title: newListTitle });
    addList(newList);
    setIsLoading(false);
  }

  async function handleDeleteList(listId: string) {
    removeList(listId);
    await listService.deleteList({ listId });
  }

  async function handleEditTitle(listId: string, newTitle: string) {
    setNewListTitle('');
    updateList(listId, newTitle);
    await listService.updateList({
      listId,
      title: newTitle,
    });
  };

  async function handleCreateTask(
    listId: string,
    description: string,
  ) {
    setIsLoading(true);
    const task = await taskService.createTask({
      listId,
      description,
    });
    addTask(task);
    setIsLoading(false);
  }

  async function handleToggleTask(listId: string, taskId: string) {
    const currentTask = getTask(listId, taskId);
    if (!currentTask) {
      return;
    }
    const newStatus = currentTask.status === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING;
    const updatedTask = {
      ...currentTask,
      status: newStatus,
    }
    if (!updatedTask) {
      return;
    }
    updateTask(updatedTask);
    await taskService.updateTask({
      ...currentTask,
      status: newStatus,
      taskId,
    });
  };

  async function deleteTask(listId: string, taskId: string) {
    removeTask(listId, taskId);
    await taskService.deleteTask({ taskId, listId });
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {user?.idToken ? (
        <div className="flex justify-center items-center my-2.5">
          <input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="New List Title"
            className="p-2.5 text-base border border-gray-300 rounded flex-grow shadow-sm mr-2"
          />
          {
            !isLoading ?
              <button
                onClick={handleCreateList}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded cursor-pointer transition-colors duration-150"
              >
                Create List
              </button> :
              <button
                onClick={handleCreateList}
                className="px-4 py-2 bg-gray-600 text-white font-bold cursor-not-allowed focus:outline-none disabled:opacity-75"
              >
                Create List
              </button>
          }
        </div>

      ) : (
        <div>Logging in...</div>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {lists ? (
          <ul>
            {lists.map((list) => (
              <ListView
                key={list.id}
                list={list}
                isLoading={isLoading}
                onDeleteList={handleDeleteList}
                onEditList={handleEditTitle}
                onToggleTask={handleToggleTask}
                onDeleteTask={deleteTask}
                onCreateTask={handleCreateTask}
              />
            ))}
          </ul>
        ) : (
          <div>No lists yet...</div>
        )}
      </ul>
      {user?.idToken ? (
        <button
          onClick={logout}
          className="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold rounded cursor-pointer transition-colors duration-150 mt-4"
        >
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default ListContainerView;
