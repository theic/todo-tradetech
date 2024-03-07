import { mock } from 'jest-mock-extended';
import { v4 as uuid } from 'uuid';
import { DefaultTaskManager, TaskManager, TaskRepository, UpdateTaskData } from '../../Task';
import { MemoryTaskRepository } from './MemoryTaskRepository';
import { ListRepositoryMock, generateListMock } from '../List/ListManager.test';
import { DefaultListManager, List, ListManager, ListRepository } from '../../List';
import { MemoryListRepository } from '../List/MemoryListRepository';

export type TaskRepositoryMock = jest.Mocked<TaskRepository>;

const generateTaskMock = (description?: string) => ({
  id: uuid(),
  description: description ?? 'Task description mock',
  listId: uuid(),
});

describe('TaskManager', () => {
  let taskRepositoryMock: TaskRepositoryMock;
  let taskManager: TaskManager;
  let listRepositoryMock: ListRepositoryMock;
  let listManager: ListManager;
  let shareList: List;

  beforeEach(async () => {
    listRepositoryMock = mock<ListRepository>(new MemoryListRepository());
    listManager = new DefaultListManager(listRepositoryMock);
    taskRepositoryMock = mock<TaskRepository>(new MemoryTaskRepository());
    taskManager = new DefaultTaskManager(taskRepositoryMock);

    const listData = generateListMock('List create');
    shareList = await listManager.create(listData);
  });

  it('should create a new task', async () => {
    const data = generateTaskMock('Task create');
    const createdTask = await taskManager.create(shareList.id, data);

    expect(createdTask).toBeDefined();
    expect(createdTask.description).toBe(data.description);
    expect(createdTask.listId).toBe(data.listId);
  });

  it('should update an existing task', async () => {
    const data = generateTaskMock('Task update');
    const existingTask = await taskManager.create(shareList.id, data);
    const updatedData: UpdateTaskData = { description: 'New Task' };

    await taskManager.update(existingTask.id, updatedData);

    const updatedTask = await taskRepositoryMock.get(existingTask.id);

    expect(updatedTask).toBeDefined();
    expect(updatedTask.description).toBe(updatedData.description);
  });

  it('should delete a task', async () => {
    const data = generateTaskMock('Task delete');
    const createdTask = await taskManager.create(shareList.id, data);

    await taskManager.delete(createdTask.id);
    const deletedTask = await taskRepositoryMock.get(createdTask.id);

    expect(deletedTask).toBeUndefined();
  });
});
