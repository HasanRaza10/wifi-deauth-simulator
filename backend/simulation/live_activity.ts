import { api } from "encore.dev/api";

export interface ActivityEvent {
  id: string;
  type: "scan" | "attack" | "connection" | "disconnect" | "traffic";
  message: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
  details?: Record<string, any>;
}

export interface LiveActivityResponse {
  events: ActivityEvent[];
}

// Get live activity events
export const getLiveActivity = api<void, LiveActivityResponse>(
  { expose: true, method: "GET", path: "/simulation/live-activity" },
  async () => {
    // Generate mock real-time activity events with more varied timestamps
    const currentTime = new Date();
    const events: ActivityEvent[] = [
      {
        id: "evt_001",
        type: "scan",
        message: "Wi-Fi network scan completed - 5 networks found",
        timestamp: new Date(currentTime.getTime() - Math.random() * 10000).toISOString(),
        severity: "low",
        details: { networksFound: 5 },
      },
      {
        id: "evt_002",
        type: "connection",
        message: "New device connected: iPhone-12 (A1:B2:C3:D4:E5:F6)",
        timestamp: new Date(currentTime.getTime() - Math.random() * 20000).toISOString(),
        severity: "medium",
        details: { deviceName: "iPhone-12", mac: "A1:B2:C3:D4:E5:F6" },
      },
      {
        id: "evt_003",
        type: "traffic",
        message: "High bandwidth usage detected from 192.168.1.30",
        timestamp: new Date(currentTime.getTime() - Math.random() * 30000).toISOString(),
        severity: "medium",
        details: { ip: "192.168.1.30", bandwidth: "25 MB/s" },
      },
      {
        id: "evt_004",
        type: "attack",
        message: "Deauth simulation started on Campus_WiFi",
        timestamp: new Date(currentTime.getTime() - Math.random() * 40000).toISOString(),
        severity: "high",
        details: { ssid: "Campus_WiFi", bssid: "AA:BB:CC:DD:EE:01" },
      },
      {
        id: "evt_005",
        type: "disconnect",
        message: "Device disconnected: Android-Phone (timeout)",
        timestamp: new Date(currentTime.getTime() - Math.random() * 50000).toISOString(),
        severity: "low",
        details: { deviceName: "Android-Phone", reason: "timeout" },
      },
      {
        id: "evt_006",
        type: "scan",
        message: "Security vulnerability scan initiated",
        timestamp: new Date(currentTime.getTime() - Math.random() * 60000).toISOString(),
        severity: "medium",
        details: { scanType: "vulnerability" },
      },
    ];

    // Sort events by timestamp (newest first)
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return { events };
  }
);
