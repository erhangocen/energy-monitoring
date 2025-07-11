import { BaseEntity } from 'src/shared/domain/base.entity';

export class Meter extends BaseEntity {
  constructor(
    public readonly name: string,
    public readonly organizationId: string,
  ) {
    super();
  }
}
