import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetReportDto {
  @ApiPropertyOptional({
    type: String,
    description: '(Admin only) Filter by organization ID',
  })
  organizationId?: string;

  @ApiPropertyOptional({ type: [String], description: 'Filter by meter IDs' })
  meterIds?: string[];

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'Start time (ISO8601)',
  })
  startTime?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'End time (ISO8601)',
  })
  endTime?: string;
}
