import { Module } from '@nestjs/common';
import { PrismaOrganizationRepository } from './infrastructure/repository/prisma-organization.repository';

import { OrganizationService } from './application/use-cases/organizaton.service';
import { OrganizationController } from './api/organization.controller';
import { DatabaseModule } from 'src/shared/database/database.module';
import { OrganizationRepository } from './domain/interfaces/organization.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    {
      provide: OrganizationRepository,
      useClass: PrismaOrganizationRepository,
    },
  ],
})
export class OrganizationModule {}
