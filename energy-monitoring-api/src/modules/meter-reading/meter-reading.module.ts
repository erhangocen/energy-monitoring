import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { MeterReadingRepository } from './domain/interfaces/meter-reading.repository';
import { PrismaMeterReadingRepository } from './infrastructure/repository/prisma-meter-reading.repository';
import { MeterReadingService } from './application/use-cases/meter-reading.service';
import { MeterReadingController } from './api/meter-reading.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MeterReadingController],
  providers: [
    MeterReadingService,
    {
      provide: MeterReadingRepository,
      useClass: PrismaMeterReadingRepository,
    },
  ],
  exports: [MeterReadingRepository],
})
export class MeterReadingModule {}
