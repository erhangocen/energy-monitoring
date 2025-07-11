import { BaseEntity } from 'src/shared/domain/base.entity';

export class Organization extends BaseEntity {
  constructor(public readonly name: string) {
    super();
  }
}
