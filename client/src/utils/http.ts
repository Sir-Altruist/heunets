import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface HttpOptions extends AxiosRequestConfig {
  requiresAuth?: boolean;
}

export interface HttpResponse<T = any> {
  details: object;
  status: string | number;
  message?: string;
  statusText?: string;
  headers?: any;
}


interface ApiErrorResponse {
  status: string;
  message: string;
  details: object;
}

export class HttpError extends Error {
  status: number;
  response?: any;

  constructor(message: string, status: number, response?: any) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.response = response;
  }
}

const API_BASE_URL = "http://127.0.0.1:8000/heunets/v1.0/api"

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async makeRequest<T>(
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    payload: object | null = null,
    options: HttpOptions = {}
  ): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse = await this.axiosInstance.request({
        method,
        url: path,
        data: payload,
        ...options,
      });

      return {
        status: response.data?.status || response.status,
        message: response?.data?.message || response?.statusText,
        details: response?.data?.details || response?.data || {}
      };
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        
        if (axiosError.response) {
          const responseData = axiosError.response.data;
          return {
            status: responseData?.status || axiosError.response.status,
            message: responseData?.message || axiosError.message,
            details: responseData?.details || {},
            statusText: axiosError.response.statusText
          };
        }
        
        if (axiosError.request) {
          return {
            status: 0,
            message: axiosError.message || 'Network error - no response received',
            details: {},
            statusText: 'Network Error'
          };
        }
        
        return {
          status: 0,
          message: axiosError.message || 'Request setup failed',
          details: {},
          statusText: 'Request Error'
        };
      }
      
      if (error instanceof HttpError) {
        return {
          status: error.status,
          message: error.message,
          details: error.response || {},
          statusText: 'HTTP Error'
        };
      }
      
      return {
        status: 500,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: {},
        statusText: 'Unknown Error'
      };
    }
  }

  async get<T>(path: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(path, 'GET', null, options);
  }

  async post<T>(
    path: string,
    payload: any,
    options: HttpOptions = {}
  ): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(path, 'POST', payload, options);
  }

  async patch<T>(
    path: string,
    payload: any,
    options: HttpOptions = {}
  ): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(path, 'PATCH', payload, options);
  }

  async delete<T>(path: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(path, 'DELETE', null, options);
  }

  async publicRequest<T>(
    path: string,
    data?: any,
    options: HttpOptions = {}
  ): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(path, "POST", data, {
      requiresAuth: false,
      ...options,
    });
  }
}

const httpClient = new HttpClient();
export default httpClient;