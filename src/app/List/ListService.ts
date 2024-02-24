import { List } from '@domain/List';

export interface ListService {
  getAllLists(): Promise<List[]>;
  createList(list: List): Promise<List>;
}

export const ListService = Symbol('ListService');
