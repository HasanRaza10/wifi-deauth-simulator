import { api } from "encore.dev/api";

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

// Get simulated connected devices
export const getConnectedDevices = api<void, ConnectedDevicesResponse>(
  { expose: true, method: "GET", path: "/simulation/connected-devices" },
  async () => {
    const devices: ConnectedDevice[] = [
      {
        device_name: "iPhone-12",
        ip: "192.168.1.25",
        mac: "A1:B2:C3:D4:E5:F6",
        visited_domain: "example.com",
        visited_ip: "93.184.216.34",
        timestamp: new Date().toISOString(),
      },
      {
        device_name: "MacBook-Pro",
        ip: "192.168.1.30",
        mac: "B2:C3:D4:E5:F6:A1",
        visited_domain: "github.com",
        visited_ip: "140.82.112.3",
        timestamp: new Date(Date.now() - 60000).toISOString(),
      },
      {
        device_name: "Android-Phone",
        ip: "192.168.1.45",
        mac: "C3:D4:E5:F6:A1:B2",
        visited_domain: "google.com",
        visited_ip: "142.250.191.14",
        timestamp: new Date(Date.now() - 120000).toISOString(),
      },
      {
        device_name: "Windows-Laptop",
        ip: "192.168.1.50",
        mac: "D4:E5:F6:A1:B2:C3",
        visited_domain: "stackoverflow.com",
        visited_ip: "151.101.1.69",
        timestamp: new Date(Date.now() - 180000).toISOString(),
      },
    ];

    return {
      devices,
      device_count: devices.length,
    };
  }
);
