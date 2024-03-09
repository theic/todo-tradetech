import {
  CreateListType,
  DeleteListType,
  ListServiceType,
  UpdateListType,
} from '../../application/List';
import { List } from '../../domain/List';
import { BaseService } from './BaseService';

export function useListService(): ListServiceType {
  return {
    createList: async ({
      title,
    }: CreateListType): Promise<List> => {
      const response = await BaseService.post(`/lists/create`, { title });
      return response.data;
    },
    deleteList: async ({
      listId,
    }: DeleteListType): Promise<void> => {
      await BaseService.delete(`/lists/${listId}/delete`);
    },
    updateList: async ({
      listId,
      title,
    }: UpdateListType): Promise<List> => {
      const response = await BaseService.patch(`/lists/${listId}/update`, { title });
      return response.data;
    },
    getLists: async (): Promise<List[]> => {
      const response = await BaseService.get('/lists');
      return response.data;
    },
  }
}
