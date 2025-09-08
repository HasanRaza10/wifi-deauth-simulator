import { Request, Response, NextFunction } from 'express';
import { ExportCSVResponse, ExportJSONResponse } from '../types';

export const exportCSV = async (
  req: Request,
  res: Response<ExportCSVResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    // Generate mock CSV data
    const csvData = `timestamp,ssid,bssid,channel,rssi,device_count
${new Date().toISOString()},Campus_WiFi,AA:BB:CC:DD:EE:01,1,-45,4
${new Date().toISOString()},Lab_AP,AA:BB:CC:DD:EE:02,6,-62,3
${new Date().toISOString()},Guest,AA:BB:CC:DD:EE:03,11,-70,2
${new Date().toISOString()},Admin_Network,AA:BB:CC:DD:EE:04,8,-55,1
${new Date().toISOString()},IoT_Devices,AA:BB:CC:DD:EE:05,3,-68,5`;

    const filename = `wifi-simulation-data-${new Date().toISOString().split('T')[0]}.csv`;

    res.json({
      filename,
      data: csvData,
    });
  } catch (error) {
    next(error);
  }
};

export const exportJSON = async (
  req: Request,
  res: Response<ExportJSONResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    // Generate mock JSON data
    const jsonData = {
      export_timestamp: new Date().toISOString(),
      networks: [
        {
          ssid: "Campus_WiFi",
          bssid: "AA:BB:CC:DD:EE:01",
          channel: 1,
          rssi: -45,
          devices: [
            { name: "Laptop-1", ip: "192.168.1.101", mac: "00:11:22:33:44:55" },
            { name: "Phone-2", ip: "192.168.1.102", mac: "00:11:22:33:44:66" },
          ]
        },
        {
          ssid: "Lab_AP",
          bssid: "AA:BB:CC:DD:EE:02",
          channel: 6,
          rssi: -62,
          devices: [
            { name: "Tablet-3", ip: "192.168.1.103", mac: "00:11:22:33:44:77" },
          ]
        },
      ],
      simulation_events: [
        {
          type: "deauth_broadcast",
          timestamp: new Date().toISOString(),
          target: "AA:BB:CC:DD:EE:01",
        },
        {
          type: "client_drop",
          timestamp: new Date(Date.now() + 1000).toISOString(),
          client: "00:11:22:33:44:55",
        },
      ],
    };

    res.json({ data: jsonData });
  } catch (error) {
    next(error);
  }
};
