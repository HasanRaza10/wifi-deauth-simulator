// Express Backend API Client
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  auth = {
    login: async (credentials: { email: string; password: string }) => {
      return this.request<{ user: { id: string; email: string; role: string } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },

    logout: async () => {
      return this.request<{ message: string }>('/auth/logout', {
        method: 'POST',
      });
    },

    register: async (userData: { name: string; email: string; password: string }) => {
      return this.request<{ user: { id: string; email: string; role: string } }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },
  };

  // Simulation endpoints
  simulation = {
    getWiFiList: async () => {
      return this.request<{ networks: Array<{ ssid: string; bssid: string; channel: number; rssi: number }> }>('/simulation/wifi-list');
    },

    getConnectedDevices: async () => {
      return this.request<{ devices: Array<{ device_name: string; ip: string; mac: string; visited_domain: string; visited_ip: string; timestamp: string }>; device_count: number }>('/simulation/connected-devices');
    },

    simulateDeauth: async (target: { target_bssid: string }) => {
      return this.request<{ router: { name: string; ip: string; mac: string }; devices: Array<{ name: string; ip: string; mac: string }>; events: Array<{ type: string; from?: string; to?: string; client?: string; timestamp: string }>; note: string }>('/simulation/deauth', {
        method: 'POST',
        body: JSON.stringify(target),
      });
    },

    getLiveActivity: async () => {
      return this.request<{ events: Array<{ id: string; type: string; message: string; timestamp: string; severity: 'low' | 'medium' | 'high'; details: Record<string, any> }> }>('/simulation/live-activity');
    },
  };

  // Password endpoints
  passwords = {
    checkStrength: async (password: { password: string }) => {
      return this.request<{ score: number; label: string; feedback: string[] }>('/passwords/strength', {
        method: 'POST',
        body: JSON.stringify(password),
      });
    },

    savePassword: async (passwordData: { user_id: string; domain: string; password: string }) => {
      return this.request<{ id: string; domain: string; created_at: string }>('/passwords/save', {
        method: 'POST',
        body: JSON.stringify(passwordData),
      });
    },

    listPasswords: async (request: { user_id: string }) => {
      return this.request<{ passwords: Array<{ id: string; domain: string; created_at: string }> }>('/passwords/list', {
        method: 'POST',
        body: JSON.stringify(request),
      });
    },
  };

  // News endpoints
  news = {
    getNewsFeed: async (params: { q?: string; page?: number } = {}) => {
      const queryParams = new URLSearchParams();
      if (params.q) queryParams.append('q', params.q);
      if (params.page) queryParams.append('page', params.page.toString());
      
      const queryString = queryParams.toString();
      const endpoint = queryString ? `/news/feed?${queryString}` : '/news/feed';
      
      return this.request<{ articles: Array<{ title: string; source: string; url: string; publishedAt: string; description?: string }>; totalResults: number }>(endpoint);
    },
  };

  // Data export endpoints
  data = {
    exportCSV: async () => {
      return this.request<{ filename: string; data: string }>('/data/csv');
    },

    exportJSON: async () => {
      return this.request<any>('/data/json');
    },
  };

  // Profile endpoints
  profile = {
    getProfile: async () => {
      return this.request<{ id: string; email: string; role: string; theme: string }>('/me');
    },

    updateProfile: async (profileData: { theme?: string }) => {
      return this.request<{ id: string; email: string; role: string; theme: string }>('/me', {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      });
    },
  };

  // System endpoints
  system = {
    getDeviceInfo: async () => {
      return this.request<{ mac_address: string; ip_address: string; gateway: string }>('/system/device-info');
    },
  };
}

// Create and export the API client instance
export const apiClient = new APIClient();
export default apiClient;