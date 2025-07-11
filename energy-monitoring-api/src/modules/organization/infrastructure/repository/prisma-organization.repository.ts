import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma.service';
import { OrganizationRepository } from '../../domain/interfaces/organization.repository';
import { Organization } from '../../domain/entities/organization.entity';
import { GenericRepository } from 'src/shared/infrastructure/prisma-base.repository';

@Injectable()
export class PrismaOrganizationRepository
  extends GenericRepository<Organization>
  implements OrganizationRepository
{
  constructor(protected prisma: PrismaService) {
    super(prisma.organization);
  }
}
