import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const BaseService = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
    },
});

export const setupTokenInterceptor = (getToken: () => Promise<string | undefined>) => {
  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token?: string) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  BaseService.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      console.log('token', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  BaseService.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return BaseService(originalRequest);
            })
            .catch(err => Promise.reject(err));

        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          getToken()
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              processQueue(null, token);
              resolve(BaseService(originalRequest)); 
            })
            .catch((err) => {
              processQueue(err);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );
};
