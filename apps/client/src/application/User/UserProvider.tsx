import { FC, createContext, useContext, useEffect, useState } from 'react';
import { setupTokenInterceptor } from '../../infrastructure/services/BaseService';
import { User } from '../../domain';
import { useUserService } from '../../infrastructure/services/UserService';
import { useUserStore } from '../../infrastructure/store';

interface UserContextValue {
  user: User | null;
  refreshIdToken: () => Promise<void>;
  isTokenExpired: (expiresAt: number | undefined) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  refreshIdToken: async () => {},
  logout: () => {},
  isTokenExpired: () => false,
});

export const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const userStore = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const userService = useUserService();

  const authenticate = async () => {
    console.log('Authenticating');
    setIsLoading(true);
    try {
      const customToken = await userService.createUser();
      const { refreshToken, idToken, expiresIn } = await userService.getIdToken(customToken);

      const expiresAt = new Date().getTime() + expiresIn * 1000;

      const newUser: User = { idToken, refreshToken, expiresAt };

      userStore.saveUser(newUser);
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeUser = async () => {
    console.log('Initializing user');
    try {
      const cachedUser = userStore.loadUser();
      if (!cachedUser) {
        return await authenticate();
      }
      if (cachedUser && cachedUser.expiresAt && isTokenExpired(cachedUser.expiresAt)) {
        await refreshIdToken();
      } else {
        console.log('Setting user from cache', cachedUser);
        userStore.saveUser(cachedUser);
      }
    } catch (error) {
      console.error('Error initializing user:', error);
    } finally {
    }
  }

  const refreshIdToken = async () => {
    console.log('Refreshing token');
    try {
      const cachedUser = userStore.loadUser();
      if (!cachedUser) {
        return;
      }
      const newTokenData = await userService.getIdTokenWithRefreshToken(cachedUser.refreshToken);
      const updatedUser = {
        ...cachedUser,
        ...newTokenData,
      };
      userStore.saveUser(updatedUser);
    } catch (error) {
      console.error('Error refreshing token:', error);
    } finally {
    }
  }

  const isTokenExpired = (expiresAt?: number | undefined) => {
    if (!expiresAt) {
      return true;
    }
    console.log('Checking if token is expired', new Date().getTime() >= expiresAt);
    return new Date().getTime() >= expiresAt;
  };

  const logout = () => {
    userStore.removeUser();
    initializeUser();
  }

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const user = userStore.loadUser();
      console.log('Getting token', user);
      if (isTokenExpired(user?.expiresAt)) {
        await refreshIdToken();
      }
      return user?.idToken;
    };

    setupTokenInterceptor(getToken);
  });

  return (
    <UserContext.Provider value={{ user: userStore.user, refreshIdToken, isTokenExpired, logout }}>
      {isLoading ? <p>Authenticating...</p> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 
