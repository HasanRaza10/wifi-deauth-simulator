import { api } from "encore.dev/api";

export interface WiFiNetwork {
  ssid: string;
  bssid: string;
  channel: number;
  rssi: number;
}

export interface WiFiListResponse {
  networks: WiFiNetwork[];
}

// Get list of simulated Wi-Fi networks
export const getWiFiList = api<void, WiFiListResponse>(
  { expose: true, method: "GET", path: "/simulation/wifi-list" },
  async () => {
    return {
      networks: [
        { ssid: "Campus_WiFi", bssid: "AA:BB:CC:DD:EE:01", channel: 1, rssi: -45 },
        { ssid: "Lab_AP", bssid: "AA:BB:CC:DD:EE:02", channel: 6, rssi: -62 },
        { ssid: "Guest", bssid: "AA:BB:CC:DD:EE:03", channel: 11, rssi: -70 },
        { ssid: "Admin_Network", bssid: "AA:BB:CC:DD:EE:04", channel: 8, rssi: -55 },
        { ssid: "IoT_Devices", bssid: "AA:BB:CC:DD:EE:05", channel: 3, rssi: -68 },
      ],
    };
  }
);
