// Simple API client for Express backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  auth = {
    login: (data: { email: string; password: string }) =>
      this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    logout: () =>
      this.request('/auth/logout', {
        method: 'POST',
      }),

    register: (data: { email: string; password: string }) =>
      this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  };

  // Data endpoints
  data = {
    exportCSV: () =>
      this.request('/data/csv', {
        method: 'GET',
      }),

    exportJSON: () =>
      this.request('/data/json', {
        method: 'GET',
      }),
  };

  // News endpoints
  news = {
    getNewsFeed: (params: { q?: string; page?: number } = {}) => {
      const searchParams = new URLSearchParams();
      if (params.q) searchParams.set('q', params.q);
      if (params.page) searchParams.set('page', params.page.toString());
      
      const queryString = searchParams.toString();
      const endpoint = queryString ? `/news/feed?${queryString}` : '/news/feed';
      
      return this.request(endpoint, {
        method: 'GET',
      });
    },
  };

  // Password endpoints
  passwords = {
    checkStrength: (data: { password: string }) =>
      this.request('/passwords/strength', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    savePassword: (data: { domain: string; password: string }) =>
      this.request('/passwords/save', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    listPasswords: () =>
      this.request('/passwords/list', {
        method: 'POST',
      }),
  };

  // Profile endpoints
  profile = {
    getProfile: () =>
      this.request('/me', {
        method: 'GET',
      }),

    updateProfile: (data: { theme?: string }) =>
      this.request('/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  };

  // Simulation endpoints
  simulation = {
    getWiFiList: () =>
      this.request('/simulation/wifi-list', {
        method: 'GET',
      }),

    simulateDeauth: (data: { target_bssid: string }) =>
      this.request('/simulation/deauth', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    getConnectedDevices: () =>
      this.request('/simulation/connected-devices', {
        method: 'GET',
      }),
  };

  // System endpoints
  system = {
    getDeviceInfo: () =>
      this.request('/system/device-info', {
        method: 'GET',
      }),
  };
}

// Create and export the API client instance
export const apiClient = new APIClient(API_BASE_URL);

// Export types for compatibility with existing frontend code
export type {
  WiFiNetwork,
  ConnectedDevice,
  DeauthResponse,
  PasswordStrengthResponse,
  NewsFeedResponse,
  UserProfile,
  DeviceInfo,
} from './types';
