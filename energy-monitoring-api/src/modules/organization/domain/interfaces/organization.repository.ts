import { BaseRepository } from 'src/shared/domain/base.repository';
import { Organization } from '../entities/organization.entity';

export abstract class OrganizationRepository extends BaseRepository<Organization> {}
