export class Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  listId: string;

  constructor(id: string, title: string, listId: string, description?: string, dueDate?: Date, status: 'pending' | 'in_progress' | 'completed' = 'pending') {
    this.id = id;
    this.title = title;
    this.listId = listId;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Method to update task details
  updateDetails(title: string, description?: string, dueDate?: Date) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.updatedAt = new Date();
  }

  markComplete() {
    if (this.status === 'completed') {
      throw new Error('Task is already completed.');
    }
    this.status = 'completed';
    this.updatedAt = new Date();
  }
}
