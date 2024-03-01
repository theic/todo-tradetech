import { mock } from 'jest-mock-extended';
import { v4 as uuid } from 'uuid';
import { DefaultListManager, List, ListManager, ListRepository, UpdateListData } from '../../List';
import { MemoryListRepository } from './MemoryListRepository';

export type ListRepositoryMock = jest.Mocked<ListRepository>;

export const generateListMock = (title?: string) => ({
  id: uuid(),
  title: title ?? `List title mock`,
  userId: uuid(),
});

describe('ListManager', () => {
  let listRepositoryMock: ListRepositoryMock;
  let listManager: ListManager;

  beforeEach(async () => {
    listRepositoryMock = mock<ListRepository>(new MemoryListRepository());
    listManager = new DefaultListManager(listRepositoryMock);
  });

  it('should create a new list', async () => {
    const data = generateListMock('List create');
    const createdList = await listManager.create(data);

    expect(createdList).toBeDefined();
    expect(createdList.title).toBe(data.title);
    expect(createdList.userId).toBe(data.userId);
  });

  it('should update an existing list', async () => {
    const data = generateListMock('List update');
    const existingList = new List(data);
    const updatedData: UpdateListData = { title: 'New List' };

    existingList.updateDetails = jest.fn();

    await listManager.update(existingList, updatedData);

    // const updatedList = await listRepositoryMock.get(existingList.id);

    expect(existingList.updateDetails).toHaveBeenCalledWith(updatedData);
  });

  it('should delete a list', async () => {
    const data = generateListMock('List delete');
    const createdList = await listManager.create(data);

    await listManager.delete(createdList);
    const deletedList = await listRepositoryMock.get(createdList.id);

    expect(deletedList).toBeUndefined();
  });
});
