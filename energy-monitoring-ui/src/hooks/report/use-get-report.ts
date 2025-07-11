import { GetReportParams } from '@/data/models/request-models/report/get-report-params-model';
import { ReportGetResponseModel } from '@/data/models/response-models/report/report-get-response-model';
import { get } from '@/network';

export const useGetReport = async ({
  organizationId,
  meterIds,
  startTime,
  endTime,
}: GetReportParams) => {
  const params = new URLSearchParams();
  organizationId && params.append('organizationId', organizationId);
  meterIds && meterIds.forEach((id) => params.append('meterIds', id));
  startTime && params.append('startTime', startTime);
  endTime && params.append('endTime', endTime);

  const report: ReportGetResponseModel = await get(
    `report?${params.toString()}`
  );
  return report;
};
