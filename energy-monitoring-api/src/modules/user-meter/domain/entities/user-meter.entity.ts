import { BaseEntity } from 'src/shared/domain/base.entity';

export class UserMeter extends BaseEntity {
  constructor(
    public readonly userId: string,
    public readonly meterId: string,
  ) {
    super(`${userId}_${meterId}`);
  }
}
