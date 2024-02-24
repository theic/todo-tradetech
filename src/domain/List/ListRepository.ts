import { List } from './List';

export interface ListRepository {
    add(list: List): Promise<void>;
    findById(id: string): Promise<List | null>;
    update(list: List): Promise<void>;
}

export const ListRepository = Symbol('ListRepository');
