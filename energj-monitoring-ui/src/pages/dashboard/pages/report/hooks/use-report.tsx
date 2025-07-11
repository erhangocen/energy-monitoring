import { OrganizationListResponseModel } from '@/data/models/response-models/organization/organization-list-response-model';
import { DecodedJWTModel } from '@/data/models/base/decoded-jwt-model';
import { useAuth } from '@/hooks/use-auth';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetOrganization } from '@/hooks/organization/use-get-organization';
import { QueryKeys } from '@/data/query-keys';

type State = {
  selectedOrganization?: string;
  defaultOrganizationName?: string;
  selectedMeters?: string[];
  isAdmin: boolean;
};

interface IReportContext {
  state: State;
  handleSelectedOrganization: (selected: string) => void;
  handleSelectedMeter: (selected: string[]) => void;
  isLoading: boolean;
}

interface ReportProviderProps {
  children: ReactNode;
}

export const ReportContext = createContext<IReportContext>(
  {} as IReportContext
);

export const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
  const { user } = useAuth();

  const [state, setState] = useState<State>({
    selectedOrganization: undefined,
    defaultOrganizationName: '',
    isAdmin: user?.role == 'admin',
  });

  const handleSelectedOrganization = (selected: string) => {
    setState((prev) => ({ ...prev, selectedOrganization: selected }));
  };

  const handleSelectedMeter = (selected: string[]) => {
    setState((prev) => ({ ...prev, selectedMeters: selected }));
  };

  const getOrganizationFnc = async () => {
    if (user?.orgId) {
      const x = await useGetOrganization(user?.orgId);
      handleSelectedOrganization(user.orgId);

      setState((prev) => ({
        ...prev,
        defaultOrganizationName: x.name,
      }));
      return x;
    }
    return null;
  };

  const { isLoading } = useQuery({
    queryFn: getOrganizationFnc,
    queryKey: [QueryKeys.GetOrganization, user?.orgId],
    retry: false,
    enabled: !!user?.orgId && user?.role == 'user',
  });

  return (
    <ReportContext.Provider
      value={{
        state,
        handleSelectedOrganization,
        handleSelectedMeter,
        isLoading,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => useContext(ReportContext);
