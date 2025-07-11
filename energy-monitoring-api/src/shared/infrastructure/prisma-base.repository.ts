import { BaseEntity } from '../domain/base.entity';

export class GenericRepository<T extends BaseEntity> {
  constructor(
    private delegate: {
      findUnique: (args: any) => Promise<T | null>;
      findMany: (args?: any) => Promise<T[]>;
      create: (args: any) => Promise<T>;
      update: (args: any) => Promise<T>;
      delete: (args: any) => Promise<T>;
    },
  ) {}

  async findById(id: string): Promise<T | null> {
    return this.delegate.findUnique({ where: { id, isDeleted: false } });
  }

  async findAll(): Promise<T[]> {
    return this.delegate.findMany({ where: { isDeleted: false } });
  }

  async create(data: T): Promise<T> {
    return this.delegate.create({ data: data });
  }

  async update(data: T): Promise<T> {
    return this.delegate.update({ where: { id: data.id }, data });
  }

  async delete(id: string): Promise<boolean> {
    await this.delegate.update({ where: { id }, data: { isDeleted: true } });
    return true;
  }
}
