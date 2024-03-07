import { useState } from 'react';
import { User } from '../../domain/User';
import { UserStoreType } from '../../domain/User/UserStoreType';

export function useUserStore(): UserStoreType {
  const [user, setUser] = useState<User | null>(null);
  
  return {
    user,
    saveUser: (user: User): void => {
      try {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error saving user to local storage:', error);
      }
    },
    loadUser: (): User | null => {
      try {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) as User : null;
      } catch (error) {
        console.error('Error loading user from local storage:', error);
        return null;
      }
    },
    removeUser: (): void => {
      try {
        setUser(null);
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing user from local storage:', error);
      }
    }
  }
}
