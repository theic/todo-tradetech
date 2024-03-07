export interface UserData {
  id: string;
  createdAt?: Date;
}

export class User {
  public readonly id: string;
  public readonly createdAt: Date;

  constructor({
    id,
    createdAt = new Date(),
  }: UserData) {
    this.id = id;
    this.createdAt = createdAt;
  }
}
