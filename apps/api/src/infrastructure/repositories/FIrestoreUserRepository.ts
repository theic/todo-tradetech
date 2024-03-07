import { User } from '@domain/User';
import { UserRepository } from '@domain/User';
import { firestore } from 'firebase-admin';
import { injectable } from 'inversify';

@injectable()
export class FirestoreUserRepository implements UserRepository {
  private readonly db: firestore.Firestore;

  constructor() {
    this.db = firestore();
  }

  public async save(user: User): Promise<void> {
    await this.db
      .collection('users')
      .doc(user.id)
      .set({
        id: user.id,
        createdAt: firestore.Timestamp.fromDate(user.createdAt),
      }, { merge: true });
  }
  
  public async get(id: string): Promise<User> {
    const userSnap = await this.db
      .collection('users')
      .doc(id)
      .get();

    if (!userSnap.exists) {
      return undefined;
    }

    const data = userSnap.data();

    return new User({
      id: data.id,
      createdAt: data.createdAt.toDate(),
    });
  }
}
