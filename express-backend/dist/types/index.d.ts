export interface User {
    id: string;
    email: string;
    password_hash: string;
    role: 'user' | 'admin';
    created_at: Date;
    locked_until: Date | null;
}
export interface UserProfile {
    id: string;
    email: string;
    role: 'user' | 'admin';
    theme: 'light' | 'dark';
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
export interface RegisterResponse {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export interface PasswordStrengthRequest {
    password: string;
}
export interface PasswordStrengthResponse {
    score: number;
    label: 'very weak' | 'weak' | 'medium' | 'strong' | 'very strong';
    feedback: string[];
}
export interface SavePasswordRequest {
    domain: string;
    password: string;
}
export interface SavePasswordResponse {
    id: string;
    domain: string;
    created_at: string;
}
export interface ListPasswordsRequest {
}
export interface SavedPassword {
    id: string;
    domain: string;
    created_at: string;
}
export interface ListPasswordsResponse {
    passwords: SavedPassword[];
}
export interface WiFiNetwork {
    ssid: string;
    bssid: string;
    channel: number;
    rssi: number;
}
export interface WiFiListResponse {
    networks: WiFiNetwork[];
}
export interface DeauthRequest {
    target_bssid: string;
}
export interface Device {
    name: string;
    ip: string;
    mac: string;
}
export interface Router {
    name: string;
    ip: string;
    mac: string;
}
export interface DeauthEvent {
    type: string;
    from?: string;
    to?: string;
    client?: string;
    timestamp: string;
}
export interface DeauthResponse {
    router: Router;
    devices: Device[];
    events: DeauthEvent[];
    note: string;
}
export interface ConnectedDevice {
    device_name: string;
    ip: string;
    mac: string;
    visited_domain: string;
    visited_ip: string;
    timestamp: string;
}
export interface ConnectedDevicesResponse {
    devices: ConnectedDevice[];
    device_count: number;
}
export interface NewsArticle {
    title: string;
    source: string;
    url: string;
    publishedAt: string;
    description?: string;
}
export interface NewsFeedRequest {
    q?: string;
    page?: number;
}
export interface NewsFeedResponse {
    articles: NewsArticle[];
    totalResults: number;
}
export interface ExportCSVResponse {
    filename: string;
    data: string;
}
export interface ExportJSONResponse {
    data: any;
}
export interface DeviceInfo {
    mac_address: string;
    ip_address: string;
    gateway: string;
}
export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
export interface APIError {
    code: string;
    message: string;
    details?: any;
}
//# sourceMappingURL=index.d.ts.map