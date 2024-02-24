export class FirestoreTaskRepository implements TaskRepository {
  add(task: Task): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  update(task: Task): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
