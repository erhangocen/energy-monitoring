import { MeterReadingDto } from 'src/modules/meter-reading/application/dtos/meter-reading.dto';

export class MeterReportDto {
  meterId: string;
  meterName: string;
  organizationId: string;
  organizationName: string;
  totalConsumption: number;
  readings: MeterReadingDto[];
}

export class OrganizationReportDto {
  organizationId: string;
  organizationName: string;
  totalConsumption: number;
  meters: MeterReportDto[];
}

export class ReportDto {
  reports: OrganizationReportDto[];
}

export class ReportPeriodDto {
  start: string; // ISO8601
  end: string; // ISO8601
}

export class MeterReadingSummaryDto {
  timestamp: string; // ISO8601
  index_kwh: number;
  consumption_kwh: number;
}

export class MeterSummaryDto {
  meterId: string;
  meterName: string;
  totalConsumptionKwh: number;
  readings: MeterReadingSummaryDto[];
}

export class OrganizationSummaryDto {
  id: string;
  name: string;
}

export class DetailedReportDto {
  organization: OrganizationSummaryDto;
  period: ReportPeriodDto;
  meters: MeterSummaryDto[];
  totalConsumptionKwh: number;
}
