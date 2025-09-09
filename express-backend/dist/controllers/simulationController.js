"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiveActivity = exports.getConnectedDevices = exports.simulateDeauth = exports.getWiFiList = void 0;
const getWiFiList = async (req, res, next) => {
    try {
        const networks = [
            { ssid: "Campus_WiFi", bssid: "AA:BB:CC:DD:EE:01", channel: 1, rssi: -45 },
            { ssid: "Lab_AP", bssid: "AA:BB:CC:DD:EE:02", channel: 6, rssi: -62 },
            { ssid: "Guest", bssid: "AA:BB:CC:DD:EE:03", channel: 11, rssi: -70 },
            { ssid: "Admin_Network", bssid: "AA:BB:CC:DD:EE:04", channel: 8, rssi: -55 },
            { ssid: "IoT_Devices", bssid: "AA:BB:CC:DD:EE:05", channel: 3, rssi: -68 },
        ];
        res.json({ networks });
    }
    catch (error) {
        next(error);
    }
};
exports.getWiFiList = getWiFiList;
const simulateDeauth = async (req, res, next) => {
    try {
        const { target_bssid } = req.body;
        const networkMap = {
            "AA:BB:CC:DD:EE:01": { name: "Campus_WiFi", ip: "192.168.1.1" },
            "AA:BB:CC:DD:EE:02": { name: "Lab_AP", ip: "192.168.2.1" },
            "AA:BB:CC:DD:EE:03": { name: "Guest", ip: "192.168.3.1" },
            "AA:BB:CC:DD:EE:04": { name: "Admin_Network", ip: "10.0.0.1" },
            "AA:BB:CC:DD:EE:05": { name: "IoT_Devices", ip: "172.16.0.1" },
        };
        const network = networkMap[target_bssid] || { name: "Unknown_AP", ip: "192.168.1.1" };
        const router = {
            name: network.name,
            ip: network.ip,
            mac: target_bssid,
        };
        const devices = [
            { name: "Laptop-1", ip: "192.168.1.101", mac: "00:11:22:33:44:55" },
            { name: "Phone-2", ip: "192.168.1.102", mac: "00:11:22:33:44:66" },
            { name: "Tablet-3", ip: "192.168.1.103", mac: "00:11:22:33:44:77" },
            { name: "Smart_TV", ip: "192.168.1.104", mac: "00:11:22:33:44:88" },
        ];
        const now = new Date().toISOString();
        const events = [
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
        res.json({
            router,
            devices,
            events,
            note: "All events are simulated for educational purposes only.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.simulateDeauth = simulateDeauth;
const getConnectedDevices = async (req, res, next) => {
    try {
        const devices = [
            {
                device_name: "Laptop-1",
                ip: "192.168.1.101",
                mac: "00:11:22:33:44:55",
                visited_domain: "github.com",
                visited_ip: "140.82.112.3",
                timestamp: new Date(Date.now() - 300000).toISOString(),
            },
            {
                device_name: "Phone-2",
                ip: "192.168.1.102",
                mac: "00:11:22:33:44:66",
                visited_domain: "google.com",
                visited_ip: "142.250.191.14",
                timestamp: new Date(Date.now() - 180000).toISOString(),
            },
            {
                device_name: "Tablet-3",
                ip: "192.168.1.103",
                mac: "00:11:22:33:44:77",
                visited_domain: "youtube.com",
                visited_ip: "142.250.191.78",
                timestamp: new Date(Date.now() - 120000).toISOString(),
            },
            {
                device_name: "Smart_TV",
                ip: "192.168.1.104",
                mac: "00:11:22:33:44:88",
                visited_domain: "netflix.com",
                visited_ip: "52.84.126.0",
                timestamp: new Date(Date.now() - 60000).toISOString(),
            },
        ];
        res.json({
            devices,
            device_count: devices.length,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getConnectedDevices = getConnectedDevices;
const getLiveActivity = async (req, res, next) => {
    try {
        const events = [
            {
                id: "event_001",
                type: "scan",
                message: "Network scan completed - 5 networks detected",
                timestamp: new Date().toISOString(),
                severity: "low",
                details: { networks_found: 5 }
            },
            {
                id: "event_002",
                type: "connection",
                message: "New device connected to Campus_WiFi",
                timestamp: new Date(Date.now() - 30000).toISOString(),
                severity: "medium",
                details: { device: "iPhone-12", mac: "AA:BB:CC:DD:EE:FF" }
            },
            {
                id: "event_003",
                type: "deauth",
                message: "Deauthentication attack simulated on Lab_AP",
                timestamp: new Date(Date.now() - 60000).toISOString(),
                severity: "high",
                details: { target: "Lab_AP", devices_affected: 3 }
            }
        ];
        res.json({ events });
    }
    catch (error) {
        next(error);
    }
};
exports.getLiveActivity = getLiveActivity;
//# sourceMappingURL=simulationController.js.map