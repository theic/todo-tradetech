import { inject, injectable } from 'inversify';
import { UserManager } from './UserManager';
import { v4 as uuid } from 'uuid';
import { UserRepository } from './UserRepository';
import firebase from 'firebase-admin';
import { User } from './User';

@injectable()
export class DefaultUserManager implements UserManager {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  public async createAnonymous(): Promise<string> {
    const userId = uuid();
    const token = await firebase.auth().createCustomToken(userId);
    const user = new User({
      id: userId,
    });
    await this.userRepository.save(user);
    return token;
  }
}
