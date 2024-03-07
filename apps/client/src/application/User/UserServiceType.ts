export type UserServiceType = {
  createUser: () => Promise<string>;
  getIdToken: (customToken: string) => Promise<{
    idToken: string;
    refreshToken: string;
    expiresIn: number;
  }>;
  getIdTokenWithRefreshToken: (refreshToken: string) => Promise<{
    idToken: string;
    expiresAt: number;
    refreshToken: string;
  }>;
};
