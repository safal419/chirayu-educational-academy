// Authentication utilities for JWT token management

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Token management
export const TOKEN_KEY = 'admin_token';
export const USER_KEY = 'admin_user';

export const setAuthData = (authData: AuthResponse) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(TOKEN_KEY, authData.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
      // Also set the old adminAuth flag for compatibility
      localStorage.setItem('adminAuth', 'true');
      
    
    } catch (error) {
      console.error("Failed to store auth data:", error);
    }
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const getUserData = (): User | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('adminAuth'); // Remove old auth flag
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = getAuthToken();
  if (!token) return false;

  try {
    // Check if token is expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch {
    return false;
  }
};

// API request helper with auth header
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
