export type ReportReading = {
  timestamp: string;
  index_kwh: number;
  consumption_kwh: number;
};

export type ReportMeter = {
  meterId: string;
  meterName: string;
  totalConsumptionKwh: number;
  readings: ReportReading[];
};

export type ReportGetResponseModel = ReportMeter[];
