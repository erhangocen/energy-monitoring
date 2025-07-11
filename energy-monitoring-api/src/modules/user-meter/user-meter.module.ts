import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UserMeterController } from './api/user-meter.controller';
import { UserMeterService } from './application/use-cases/user-meter.service';
import { UserMeterRepository } from './domain/interfaces/user-meter.repository';
import { PrismaUserMeterRepository } from './infrastructure/repository/prisma-user-meter.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserMeterController],
  providers: [
    UserMeterService,
    {
      provide: UserMeterRepository,
      useClass: PrismaUserMeterRepository,
    },
  ],
})
export class UserMeterModule {}
