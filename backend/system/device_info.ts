import { api } from "encore.dev/api";

export interface DeviceInfoResponse {
  mac_address: string;
  ip_address: string;
  gateway: string;
}

// Get simulated device information
export const getDeviceInfo = api<void, DeviceInfoResponse>(
  { expose: true, method: "GET", path: "/system/device-info" },
  async () => {
    return {
      mac_address: "00:1B:44:11:3A:B7",
      ip_address: "192.168.1.105",
      gateway: "192.168.1.1",
    };
  }
);
