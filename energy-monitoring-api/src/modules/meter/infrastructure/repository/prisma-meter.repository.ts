import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { GenericRepository } from 'src/shared/infrastructure/prisma-base.repository';
import { Meter } from '../../domain/entities/meter.entity';
import { MeterRepository } from '../../domain/interfaces/meter.repository';

@Injectable()
export class PrismaMeterRepository
  extends GenericRepository<Meter>
  implements MeterRepository
{
  constructor(protected prisma: PrismaService) {
    super(prisma.meter);
  }
}
