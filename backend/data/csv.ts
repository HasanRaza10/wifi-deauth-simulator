import { api } from "encore.dev/api";

export interface CSVExportResponse {
  data: string;
  filename: string;
  contentType: string;
}

// Export simulation data as CSV
export const exportCSV = api<void, CSVExportResponse>(
  { expose: true, method: "GET", path: "/data/csv" },
  async () => {
    const csvData = `Device Name,IP Address,MAC Address,Domain,IP,Timestamp
iPhone-12,192.168.1.25,A1:B2:C3:D4:E5:F6,example.com,93.184.216.34,${new Date().toISOString()}
MacBook-Pro,192.168.1.30,B2:C3:D4:E5:F6:A1,github.com,140.82.112.3,${new Date(Date.now() - 60000).toISOString()}
Android-Phone,192.168.1.45,C3:D4:E5:F6:A1:B2,google.com,142.250.191.14,${new Date(Date.now() - 120000).toISOString()}
Windows-Laptop,192.168.1.50,D4:E5:F6:A1:B2:C3,stackoverflow.com,151.101.1.69,${new Date(Date.now() - 180000).toISOString()}`;

    return {
      data: csvData,
      filename: 'wifi-simulation-data.csv',
      contentType: 'text/csv',
    };
  }
);
