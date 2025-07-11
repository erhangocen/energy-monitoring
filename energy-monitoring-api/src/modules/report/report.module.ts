import { Module } from '@nestjs/common';
import { ReportService } from './application/use-cases/report.service';
import { ReportController } from './api/report.controller';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
