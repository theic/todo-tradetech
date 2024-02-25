import { List, ListRepository } from '@domain/List';
import { firestore } from 'firebase-admin';

export class FirestoreListRepository implements ListRepository {
  private db = firestore();
  private collection = this.db.collection('lists');

  async add(list: List): Promise<void> {
    await this.collection.doc(list.id).set({
      title: list.title,
      description: list.description,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    });
  }

  async findById(id: string): Promise<List | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data();
    return new List(id, data.title, data.description);
  }

  async update(list: List): Promise<void> {
    await this.collection.doc(list.id).update({
      title: list.title,
      description: list.description,
      updatedAt: new Date(),
    });
  }
}
