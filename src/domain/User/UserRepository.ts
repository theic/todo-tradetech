import { User } from './User';

export interface UserRepository {
  save(user: User): Promise<void>;
  get(id: string): Promise<User | undefined>;
}

export const UserRepository = Symbol('UserRepository');
