import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReportService } from '../application/use-cases/report.service';
import { JwtAuthGuard } from '../../auth/utils/jwt/jwt.guard';
import { CurrentUser } from '../../auth/utils/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/modules/auth/application/dtos/current-user.dto';
import { GetReportDto } from '../application/dtos/get-report.dto';
import { MeterSummaryDto } from '../application/dtos/report.dto';

@ApiTags('Report')
@ApiBearerAuth()
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Detaylı enerji tüketimi raporu',
  })
  async getReport(
    @CurrentUser() user: CurrentUserDto,
    @Query() query: GetReportDto,
  ): Promise<MeterSummaryDto[]> {
    return this.reportService.getDetailedReport(user, query);
  }
}
