import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type State = {};

interface IDashboardContext {
  redirectionLoading: boolean;
}

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardContext = createContext<IDashboardContext>(
  {} as IDashboardContext
);

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const redirectionLoading = false;

  useEffect(() => {
    navigate('report');
  }, []);

  return (
    <DashboardContext.Provider value={{ redirectionLoading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
