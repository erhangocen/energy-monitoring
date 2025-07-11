import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { MeterRepository } from './domain/interfaces/meter.repository';
import { PrismaMeterRepository } from './infrastructure/repository/prisma-meter.repository';
import { MeterService } from './application/use-cases/meter.service';
import { MeterController } from './api/meter.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MeterController],
  providers: [
    MeterService,
    {
      provide: MeterRepository,
      useClass: PrismaMeterRepository,
    },
  ],
  exports: [MeterRepository],
})
export class MeterModule {}
