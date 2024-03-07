export interface UserManager {
  createAnonymous(): Promise<string>;
}

export const UserManager = Symbol('UserManager');
