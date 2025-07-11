import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { GenericRepository } from 'src/shared/infrastructure/prisma-base.repository';
import { MeterReading } from '../../domain/entities/meter-reading.entity';
import { MeterReadingRepository } from '../../domain/interfaces/meter-reading.repository';

@Injectable()
export class PrismaMeterReadingRepository
  extends GenericRepository<MeterReading>
  implements MeterReadingRepository
{
  constructor(protected prisma: PrismaService) {
    super(prisma.meterReading);
  }

  async findWithMeterId(meterId: string): Promise<MeterReading[]> {
    return this.prisma.meterReading.findMany({
      where: { isDeleted: false, meterId: meterId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
