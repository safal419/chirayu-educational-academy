import axios from 'axios';
import { apiConfig } from './config';
import { LoginCredentials, AuthResponse, User } from './auth-utils';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(apiConfig.endpoints.auth.login, credentials);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('Invalid email or password');
      }
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Login failed. Please try again.');
    }
  }

  static async getProfile(): Promise<User> {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(apiConfig.endpoints.auth.profile, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.data.user;
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Token is invalid, clear auth data
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error('Failed to fetch user profile');
    }
  }

  static async validateToken(): Promise<boolean> {
    try {
      await this.getProfile();
      return true;
    } catch {
      return false;
    }
  }
}
