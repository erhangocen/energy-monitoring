import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Environment variables'dan API URL'yi al
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const apiTimeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

export const baseAxiosConfig = axios.create({
  baseURL: baseUrl,
  timeout: apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + (localStorage.getItem('jwtToken') ?? ''),
    'x-content-type-options': 'nosniff',
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self' https://apis.google.com", // örnek CSP başlığı
    'x-frame-options': 'DENY', // Clickjacking koruması
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload', // HSTS
    'x-xss-protection': '1; mode=block', // XSS koruması
  },
});

const customUrl = (url: string) => {
  // if (baseUrl == 'http://localhost:') {
  //   return baseUrl + url.replace('.app.github.dev', '');
  // } else {
  //   return baseUrl.endsWith('-') ? baseUrl + url : baseUrl + '/' + url;
  // }

  return url;
};

export const get = async (
  url: string,
  params?: AxiosRequestConfig<unknown>,
  headers?: any
) => {
  const response = await baseAxiosConfig.get(customUrl(url), {
    ...params,
    headers: { ...headers },
  });

  return response.data;
};

export const post: <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig<unknown>,
  headers?: any
) => Promise<T> = async (
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig<unknown>,
  headers?: any
) => {
  const response: AxiosResponse<any, any> = await baseAxiosConfig.post(
    customUrl(url),
    data,
    {
      headers: {
        ...headers,
      },
      ...config,
    }
  );
  return response.data;
};

export const put = async (url: string, data?: unknown) => {
  const response = await baseAxiosConfig.put(customUrl(url), data);

  return response.data;
};

export const del = async (url: string, data: unknown) => {
  const response = await baseAxiosConfig.delete(customUrl(url), { data: data });

  return response.data;
};

baseAxiosConfig.interceptors.request.use(
  (config) => {
    const authTokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY || 'jwtToken';
    const jwtToken = localStorage.getItem(authTokenKey);
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseAxiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshTokenKey =
        import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refreshToken';
      const refreshToken = localStorage.getItem(refreshTokenKey);
      if (refreshToken) {
        try {
          const response = await axios.post(`${baseUrl}/refreshToken`, {
            refreshToken,
          });
          // don't use axious instance that already configured for refresh token api call
          const newJwtToken = response.data.accessToken;
          const authTokenKey =
            import.meta.env.VITE_AUTH_TOKEN_KEY || 'jwtToken';
          localStorage.setItem(authTokenKey, newJwtToken); //set new access token
          originalRequest.headers.Authorization = `Bearer ${newJwtToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error) {
          const authTokenKey =
            import.meta.env.VITE_AUTH_TOKEN_KEY || 'jwtToken';
          const refreshTokenKey =
            import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refreshToken';
          localStorage.removeItem(authTokenKey);
          localStorage.removeItem(refreshTokenKey);
        }
      }
    }
    return Promise.reject(error);
  }
);
