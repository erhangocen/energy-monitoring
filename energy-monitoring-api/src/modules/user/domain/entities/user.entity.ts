import { Organization } from 'src/modules/organization/domain/entities/organization.entity';
import { BaseEntity } from 'src/shared/domain/base.entity';

export type UserRole = 'admin' | 'user';

export class User extends BaseEntity {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly role: UserRole,
    public readonly organizationId: string | null,
    public readonly organization?: Organization | null,
  ) {
    super();
  }
}
