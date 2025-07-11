import { ReportGetResponseModel } from '@/data/models/response-models/report/report-get-response-model';
import { QueryKeys } from '@/data/query-keys';
import { useGetReport } from '@/hooks/report/use-get-report';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useEffect } from 'react';

type State = {};

interface IMeterContext {
  reportData?: ReportGetResponseModel;
  isLoading: boolean;
}

interface MeterProviderProps {
  children: ReactNode;
  organizationId: string;
  meterIds?: string[];
}

export const MeterContext = createContext<IMeterContext>({} as IMeterContext);

export const MeterProvider: React.FC<MeterProviderProps> = ({
  children,
  organizationId,
  meterIds,
}) => {
  const getReportFnc = async () => {
    return await useGetReport({
      organizationId: organizationId,
      meterIds: meterIds,
    });
  };

  const { data: reportData, isLoading } = useQuery({
    queryFn: getReportFnc,
    queryKey: [QueryKeys.GetOrganization, organizationId, meterIds],
    retry: false,
    enabled: !!organizationId,
  });

  return (
    <MeterContext.Provider value={{ reportData, isLoading }}>
      {children}
    </MeterContext.Provider>
  );
};

export const useMeter = () => useContext(MeterContext);
