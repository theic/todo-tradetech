import { inject, injectable } from 'inversify';
import { List } from './List';
import { CreateListData, ListManager, UpdateListData } from './ListManager';
import { ListRepository } from './ListRepository';

@injectable()
export class DefaultListManager implements ListManager {
  constructor(
    @inject(ListRepository) private listRepository: ListRepository,
  ) {}

  public async create(data: CreateListData): Promise<List> {
    const list = new List(data);
    await this.listRepository.save(list);
    return list;
  }

  public async update(list: List, data: UpdateListData): Promise<List> {
    list.updateDetails({ ...data });
    await this.listRepository.save(list);
    return list;
  }

  public async delete(list: List): Promise<void> {
    await this.listRepository.delete(list.id);
  }
}
