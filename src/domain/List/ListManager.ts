import { List, ListData } from './List';

export interface CreateListData extends Pick<ListData, 'userId' | 'title'> {
}

export interface UpdateListData extends Partial<Pick<ListData, 'title'>> {
}

export interface ListManager {
  create(data: CreateListData): Promise<List>;
  update(list: List, data: UpdateListData): Promise<List>;
  delete(list: List): Promise<void>;
}

export const ListManager = Symbol('ListManager');
