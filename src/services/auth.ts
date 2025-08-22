import { apiService } from './api';
import { User, ApiResponse } from '@/types';
import { API_ENDPOINTS } from '@/constants';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  async logout(): Promise<ApiResponse<null>> {
    return apiService.post<null>(API_ENDPOINTS.AUTH.LOGOUT);
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiService.post<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH);
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>('/api/auth/me');
  },
};
