import { List, ListRepository } from '@domain/List';

export class MemoryListRepository implements ListRepository {
  private lists: List[] = [];

  async save(list: List): Promise<void> {
    this.lists.push(list);
  }

  async findForUser(userId: string): Promise<List[]> {
    return this.lists.filter((list) => list.userId === userId);
  }

  async get(id: string): Promise<List | undefined> {
    return this.lists.find((list) => list.id === id);
  }

  async delete(id: string): Promise<void> {
    const index = this.lists.findIndex((list) => list.id === id);
    if (index !== -1) {
      this.lists.splice(index, 1);
    }
  }
}
