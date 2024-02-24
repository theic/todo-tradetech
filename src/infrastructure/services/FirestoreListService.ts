import { ListService } from '@app/List';
import { List } from '@domain/List';
import { injectable } from 'inversify';

@injectable()
export class FirestoreListService implements ListService {
  getAllLists(): Promise<List[]> {
    throw new Error('Method not implemented.');
  }
  createList(list: List): Promise<List> {
    throw new Error('Method not implemented.');
  }
}
