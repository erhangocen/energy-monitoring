export abstract class BaseEntity {
  public readonly id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly isDeleted: boolean;

  constructor(
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    isDeleted?: boolean,
  ) {
    this.id = id || crypto.randomUUID();
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.isDeleted = isDeleted || false;
  }
}
