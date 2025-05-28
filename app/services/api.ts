import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple simultaneous token refreshes
let isRefreshing = false;
// Store of callbacks to be executed after token refresh
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("refresh_token")}`
        }
      }
    );
    
    const { access_token } = response.data;
    Cookies.set("access_token", access_token);
    return access_token;
  } catch (err) {
    // If refresh token is invalid, logout user and log error
    console.error('Failed to refresh token:', err);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.href = "/login";
    return null;
  }
};

// Subscribe to token refresh
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Notify all subscribers about new token
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
};

// Request interceptor
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
    
    // If error is not 401 or request has already been retried, reject
    if (!error.response || error.response.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    // If no original request exists, reject
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Mark request as retried
    originalRequest._retry = true;

    // If token refresh is already in progress, wait for it
    if (isRefreshing) {
      try {
        const token = await new Promise<string>((resolve) => {
          subscribeTokenRefresh((token: string) => {
            resolve(token);
          });
        });
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    // Start token refresh process
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      isRefreshing = false;

      if (!newToken) {
        return Promise.reject(error);
      }

      onTokenRefreshed(newToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return api(originalRequest);
    } catch (err) {
      isRefreshing = false;
      return Promise.reject(err);
    }
  }
);

export default api;
