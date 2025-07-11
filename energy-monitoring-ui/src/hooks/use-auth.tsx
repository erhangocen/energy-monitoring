import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory } from './use-history';
import { DecodedJWTModel } from '@/data/models/base/decoded-jwt-model';

interface IAuthContext {
  user?: DecodedJWTModel;
  isAuthanticated?: boolean;
  // login: (loginModel: LoginRequestModel) => Promise<boolean>
  //   login: (
  //     loginModel: LoginRequestModel
  //   ) => Promise<SingleResponseModel<LoginResponseModel>>
  logOut: () => void;
  role?: string;
  login: (jwtToken: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthanticated, setIsAuthanticated] = useState<boolean>();
  const [user, setUser] = useState<DecodedJWTModel>();

  const { resetHistory } = useHistory();

  // Environment variables'dan token key'leri al
  const authTokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY || 'jwtToken';
  const refreshTokenKey =
    import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refreshToken';

  useEffect(() => {
    const token = localStorage.getItem(authTokenKey);
    if (token != null) {
      updateUser(token);
    } else {
      setIsAuthanticated(false);
      setUser(undefined);
    }
  }, [localStorage.getItem(authTokenKey)]);

  // useEffect(() => {
  //   setRoles(
  //     JSON.parse(
  //       user?.[
  //         'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
  //       ] ?? '[]'
  //     )
  //   );
  // }, [user]);

  const updateUser = async (token: string) => {
    setIsAuthanticated(true);
    const decodedJWTModel = jwtDecode<DecodedJWTModel>(token);
    setUser(decodedJWTModel);
  };

  const logOut = () => {
    setIsAuthanticated(false);
    localStorage.removeItem(authTokenKey);
    localStorage.removeItem(refreshTokenKey);
    resetHistory();
  };

  const login = (jwtToken: string) => {
    setIsAuthanticated(true);
    localStorage.setItem(authTokenKey, jwtToken);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthanticated,
        logOut,
        role: user?.role,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
