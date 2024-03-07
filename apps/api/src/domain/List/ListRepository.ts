import { List } from './List';

export interface ListRepository {
  save(list: List): Promise<void>;
  findForUser(userId: string): Promise<List[]>;
  get(id: string): Promise<List | undefined>;
  delete(id: string): Promise<void>;
}

export const ListRepository = Symbol('ListRepository');
