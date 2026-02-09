import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import type { User, UserUpdate, ApiError } from "../types/user";

export interface IdentiesClientConfig {
  identiesApiUrl: string;
  token: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export function createIdentiesClient(config: IdentiesClientConfig) {
  const baseURL = config.identiesApiUrl || "http://localhost:8000";

  const client: AxiosInstance = axios.create({
    baseURL,
    timeout: config.timeout || 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
      ...config.headers,
    },
  });

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response) {
        const apiError: ApiError = {
          detail: error.response.data?.detail || "An error occurred",
          status_code: error.response.status,
        };
        return Promise.reject(apiError);
      }
      return Promise.reject({
        detail: "Network error",
        status_code: 0,
      });
    },
  );

  const getCurrentUser = async (): Promise<User> => {
    const response = await client.get<User>("/me");

    return response.data;
  };

  const updateUser = async (userUpdate: UserUpdate): Promise<User> => {
    const response = await client.put<User>("/me", userUpdate);
    return response.data;
  };

  const request = async <T>(axiosConfig: AxiosRequestConfig): Promise<T> => {
    const response = await client.request<T>(axiosConfig);
    return response.data;
  };

  return {
    getCurrentUser,
    updateUser,
    request,
  };
}
