import { api } from "encore.dev/api";
import { authDB } from "../auth/db";

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

// Simulate deauthentication attack
export const simulateDeauth = api<DeauthRequest, DeauthResponse>(
  { expose: true, method: "POST", path: "/simulation/deauth" },
  async (req) => {
    // Get network info based on BSSID
    const networkMap: Record<string, { name: string; ip: string }> = {
      "AA:BB:CC:DD:EE:01": { name: "Campus_WiFi", ip: "192.168.1.1" },
      "AA:BB:CC:DD:EE:02": { name: "Lab_AP", ip: "192.168.2.1" },
      "AA:BB:CC:DD:EE:03": { name: "Guest", ip: "192.168.3.1" },
      "AA:BB:CC:DD:EE:04": { name: "Admin_Network", ip: "10.0.0.1" },
      "AA:BB:CC:DD:EE:05": { name: "IoT_Devices", ip: "172.16.0.1" },
    };

    const network = networkMap[req.target_bssid] || { name: "Unknown_AP", ip: "192.168.1.1" };

    const router: Router = {
      name: network.name,
      ip: network.ip,
      mac: req.target_bssid,
    };

    const devices: Device[] = [
      { name: "Laptop-1", ip: "192.168.1.101", mac: "00:11:22:33:44:55" },
      { name: "Phone-2", ip: "192.168.1.102", mac: "00:11:22:33:44:66" },
      { name: "Tablet-3", ip: "192.168.1.103", mac: "00:11:22:33:44:77" },
      { name: "Smart_TV", ip: "192.168.1.104", mac: "00:11:22:33:44:88" },
    ];

    const now = new Date().toISOString();
    const events: DeauthEvent[] = [
      {
        type: "deauth_broadcast",
        from: "red_hacker",
        to: "all_clients",
        timestamp: now,
      },
      {
        type: "client_drop",
        client: "00:11:22:33:44:55",
        timestamp: new Date(Date.now() + 1000).toISOString(),
      },
      {
        type: "client_drop",
        client: "00:11:22:33:44:66",
        timestamp: new Date(Date.now() + 2000).toISOString(),
      },
      {
        type: "reconnect_attempt",
        client: "00:11:22:33:44:55",
        timestamp: new Date(Date.now() + 5000).toISOString(),
      },
    ];

    return {
      router,
      devices,
      events,
      note: "All events are simulated for educational purposes only.",
    };
  }
);
