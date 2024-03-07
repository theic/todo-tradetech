import { List } from '../../domain';

export type CreateListType = {
  title: string;
};

export type UpdateListType = {
  listId: string;
  title: string;
};

export type DeleteListType = {
  listId: string;
};

export type ListServiceType = {
  createList: (params: CreateListType) => Promise<List>;
  deleteList: (params: DeleteListType) => Promise<void>;
  updateList: (params: UpdateListType) => Promise<List>;
  getLists: () => Promise<List[]>;
};
