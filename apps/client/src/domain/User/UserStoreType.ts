import { User } from '../User';

export type UserStoreType = {
  user: User | null;
  saveUser: (user: User) => void;
  loadUser: () => User | null;
  removeUser: () => void;
};
