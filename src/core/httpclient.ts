// services/httpClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { store } from "../stores/store";

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use((config) => {
      const token = store.commonStore.token;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error);
        const { status } = error.response || {};
        if (status === 401) {
          store.userStore.logout();
        }
        return Promise.reject(error.response?.data);
      }
    );
  }

  public get<T>(url: string, params?: Record<string, any>) {
    const config: AxiosRequestConfig = {
      params: params || {},
    };
    return this.axiosInstance.get<T>(url, config).then((response) => response.data);
  }

  public post<T>(url: string, body: any) {
    return this.axiosInstance.post<T>(url, body).then((response) => response.data);
  }

  public put<T>(url: string, body: any) {
    return this.axiosInstance.put<T>(url, body).then((response) => response.data);
  }

  public delete<T>(url: string) {
    return this.axiosInstance.delete<T>(url).then((response) => response.data);
  }
  
}

export const httpClient = new HttpClient();