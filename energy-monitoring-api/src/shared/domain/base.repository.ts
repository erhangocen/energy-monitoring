import { BaseEntity } from './base.entity';

export abstract class BaseRepository<T extends BaseEntity> {
  abstract create(data: T): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract update(data: T): Promise<T>;
  abstract delete(id: string): Promise<boolean>;
}
