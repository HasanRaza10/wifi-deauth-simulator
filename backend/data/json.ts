import { api } from "encore.dev/api";

export interface ExportData {
  devices: Array<{
    device_name: string;
    ip: string;
    mac: string;
    visited_domain: string;
    visited_ip: string;
    timestamp: string;
  }>;
  exported_at: string;
  note: string;
}

// Export simulation data as JSON
export const exportJSON = api<void, ExportData>(
  { expose: true, method: "GET", path: "/data/json" },
  async () => {
    return {
      devices: [
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
      ],
      exported_at: new Date().toISOString(),
      note: "All data is simulated for educational purposes only.",
    };
  }
);
