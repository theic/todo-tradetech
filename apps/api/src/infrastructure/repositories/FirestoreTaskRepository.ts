import { Task, TaskRepository } from '@domain/Task';
import { firestore } from 'firebase-admin';
import { injectable } from 'inversify';

@injectable()
export class FirestoreTaskRepository implements TaskRepository {
  private readonly db: firestore.Firestore;

  constructor() {
    this.db = firestore();
  }

  public async delete(id: string): Promise<void> {
    await this.db
      .collection('tasks')
      .doc(id)
      .delete();
  }

  public async save(task: Task): Promise<void> {
    await this.db
      .collection('tasks')
      .doc(task.id)
      .set({
        listId: task.listId,
        description: task.description,
        status: task.status,
        createdAt: firestore.Timestamp.fromDate(task.createdAt),
        updatedAt: firestore.Timestamp.fromDate(task.updatedAt),
      }, {
        merge: true,
      });
  }
  
  public async get(id: string): Promise<Task> {
    const taskSnap = await this.db
      .collection('tasks')
      .doc(id)
      .get();

    if (!taskSnap.exists) {
      throw new Error('Task not found');
    }

    const data = taskSnap.data();
    return new Task({
      id,
      listId: data.listId,
      status: data.status,
      description: data.description,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    })
  }
}
