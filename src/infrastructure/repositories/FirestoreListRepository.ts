import { List, ListRepository } from '@domain/List';
import { Task } from '@domain/Task';
import { firestore } from 'firebase-admin';
import { injectable } from 'inversify';

@injectable()
export class FirestoreListRepository implements ListRepository {
  private readonly db: firestore.Firestore;

  constructor() {
    this.db = firestore();
  }

  public async delete(id: string): Promise<void> {
    await this.db
      .collection('lists')
      .doc(id)
      .delete();
  }

  public async save(list: List): Promise<void> {
    console.log('list', list);
    await this.db
      .collection('lists')
      .doc(list.id)
      .set({
        id: list.id,
        userId: list.userId,
        title: list.title,
        createdAt: firestore.Timestamp.fromDate(list.createdAt),
        updatedAt: firestore.Timestamp.fromDate(list.updatedAt),
      }, {
        merge: true,
      });
  }

  public async findForUser(userId: string): Promise<List[]> {
    const listsSnap = await this.db
      .collection('lists')
      .where('userId', '==', userId)
      .get();
    const lists: List[] = [];

    if (listsSnap.empty) {
      return [];
    }

    listsSnap.docs.forEach((doc) => {
      const data = doc.data();
      lists.push(
        new List({
          id: doc.id,
          userId: data.userId,
          title: data.title,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        })
      );
    });

    const ids = lists.map(({ id }) => id);
    const tasksSnap = await this.db
      .collection('tasks')
      .where('listId', 'in', ids)
      .get();
    const tasks: Task[] = [];

    tasksSnap.docs.forEach((doc) => {
      const data = doc.data();
      tasks.push(
        new Task({
          id: doc.id,
          listId: data.listId,
          description: data.description,
          status: data.status,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        })
      );
    });

    const tasksGroupedByListId = this.groupTasksByListId(tasks);

    lists.forEach(list => {
      const tasksForList = tasksGroupedByListId[list.id];
      if (tasksForList) {
        list.tasks = tasksForList;
      }
    });

    return lists;
  }

  public async get(id: string): Promise<List | undefined> {
    const listSnap = await this.db
      .collection('lists')
      .doc(id)
      .get();

    if (!listSnap.exists) {
      return undefined;
    }

    const data = listSnap.data();
    return new List({
      id,
      userId: data.userId,
      title: data.title,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    });
  }

  private groupTasksByListId(tasks: Task[]): Record<string, Task[]> {
    return tasks.reduce((accumulator: Record<string, Task[]>, task: Task) => {
      const { listId } = task;
      if (!accumulator[listId]) {
        accumulator[listId] = [];
      }
      accumulator[listId].push(task);
      return accumulator;
    }, {});
  };
}
