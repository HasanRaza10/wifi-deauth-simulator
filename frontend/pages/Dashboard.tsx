import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Download, Target, Wifi, Monitor, FileDown } from 'lucide-react';
import backend from '~backend/client';
import type { WiFiNetwork } from '~backend/simulation/wifi_list';
import type { ConnectedDevice } from '~backend/simulation/connected_devices';
import LegalBanner from '../components/LegalBanner';
import RadarAnimation from '../components/RadarAnimation';
import WiFiStrengthIndicator from '../components/WiFiStrengthIndicator';

export default function Dashboard() {
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackResult, setAttackResult] = useState<any>(null);
  const { toast } = useToast();

  const { data: deviceInfo } = useQuery({
    queryKey: ['device-info'],
    queryFn: () => backend.system.getDeviceInfo(),
  });

  const { data: wifiNetworks } = useQuery({
    queryKey: ['wifi-networks'],
    queryFn: () => backend.simulation.getWiFiList(),
  });

  const { data: connectedDevices } = useQuery({
    queryKey: ['connected-devices'],
    queryFn: () => backend.simulation.getConnectedDevices(),
  });

  const handleAttack = async (network: WiFiNetwork) => {
    setSelectedNetwork(network);
    setIsAttacking(true);
    setAttackResult(null);

    try {
      const result = await backend.simulation.simulateDeauth({
        target_bssid: network.bssid,
      });
      setAttackResult(result);
      
      toast({
        title: 'Simulation Started',
        description: `Mock deauth attack on ${network.ssid} initiated`,
      });
    } catch (error) {
      console.error('Attack simulation error:', error);
      toast({
        title: 'Simulation Error',
        description: 'Failed to start attack simulation',
        variant: 'destructive',
      });
    }
  };

  const handleExport = async (format: 'csv' | 'json') => {
    try {
      let response;
      let filename;
      let data;
      
      if (format === 'csv') {
        response = await backend.data.exportCSV();
        filename = response.filename;
        data = response.data;
      } else {
        response = await backend.data.exportJSON();
        filename = 'wifi-simulation-data.json';
        data = JSON.stringify(response, null, 2);
      }

      // Create blob and download
      const blob = new Blob([data], {
        type: format === 'csv' ? 'text/csv' : 'application/json',
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Export Complete',
        description: `Data exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export Failed',
        description: 'Failed to export data',
        variant: 'destructive',
      });
    }
  };

  const getSignalColor = (rssi: number) => {
    if (rssi > -50) return 'bg-green-500';
    if (rssi > -70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <LegalBanner />
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Wi-Fi De-Authentication Dashboard</h1>
        <p className="text-muted-foreground">
          Educational tool for cybersecurity awareness — All simulations are mock demonstrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="h-5 w-5" />
              <span>Device Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deviceInfo ? (
              <>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">MAC Address:</span>
                  <p className="font-mono text-sm">{deviceInfo.mac_address}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">IP Address:</span>
                  <p className="font-mono text-sm">{deviceInfo.ip_address}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Gateway:</span>
                  <p className="font-mono text-sm">{deviceInfo.gateway}</p>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">Loading device info...</p>
            )}
          </CardContent>
        </Card>

        {/* Wi-Fi Strength */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wifi className="h-5 w-5" />
              <span>Wi-Fi Strength</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WiFiStrengthIndicator />
          </CardContent>
        </Card>

        {/* Export Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => handleExport('csv')} 
              variant="outline" 
              className="w-full"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
            <Button 
              onClick={() => handleExport('json')} 
              variant="outline" 
              className="w-full"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download JSON
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Available Wi-Fi Networks */}
      <Card>
        <CardHeader>
          <CardTitle>Available Wi-Fi Networks</CardTitle>
          <CardDescription>
            Simulated wireless networks in range. Click "Attack" to start mock deauth simulation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wifiNetworks?.networks.map((network) => (
              <div
                key={network.bssid}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getSignalColor(network.rssi)}`} />
                  <div>
                    <h4 className="font-medium">{network.ssid}</h4>
                    <p className="text-sm text-muted-foreground font-mono">{network.bssid}</p>
                  </div>
                  <Badge variant="secondary">Channel {network.channel}</Badge>
                  <Badge variant="outline">{network.rssi} dBm</Badge>
                </div>
                <Button
                  onClick={() => handleAttack(network)}
                  variant="destructive"
                  size="sm"
                  disabled={isAttacking}
                >
                  <Target className="mr-2 h-4 w-4" />
                  Attack (Simulated)
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attack Visualization */}
      {(isAttacking || attackResult) && (
        <Card>
          <CardHeader>
            <CardTitle>Attack Simulation</CardTitle>
            <CardDescription>
              Live visualization of simulated deauthentication attack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex justify-center">
                <RadarAnimation 
                  isActive={isAttacking}
                  onAnimationComplete={() => setIsAttacking(false)}
                />
              </div>
              <div className="space-y-4">
                {selectedNetwork && (
                  <div>
                    <h4 className="font-medium mb-2">Target Network</h4>
                    <p className="text-sm"><strong>SSID:</strong> {selectedNetwork.ssid}</p>
                    <p className="text-sm"><strong>BSSID:</strong> {selectedNetwork.bssid}</p>
                    <p className="text-sm"><strong>Channel:</strong> {selectedNetwork.channel}</p>
                  </div>
                )}
                
                {attackResult && (
                  <div>
                    <h4 className="font-medium mb-2">Simulation Events</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {attackResult.events.map((event: any, index: number) => (
                        <div key={index} className="text-xs p-2 bg-muted rounded border-l-2 border-red-500">
                          <span className="font-medium">{event.type}:</span>
                          {event.from && <span> from {event.from}</span>}
                          {event.to && <span> to {event.to}</span>}
                          {event.client && <span> client {event.client}</span>}
                          <div className="text-muted-foreground">{new Date(event.timestamp).toLocaleTimeString()}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{attackResult.note}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Devices</CardTitle>
          <CardDescription>
            Simulated devices and their network traffic (all data is mock)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {connectedDevices && (
            <>
              <div className="mb-4">
                <Badge variant="secondary">
                  {connectedDevices.device_count} devices connected
                </Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>MAC Address</TableHead>
                    <TableHead>Visited Domain</TableHead>
                    <TableHead>Visited IP</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connectedDevices.devices.map((device, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{device.device_name}</TableCell>
                      <TableCell className="font-mono text-sm">{device.ip}</TableCell>
                      <TableCell className="font-mono text-sm">{device.mac}</TableCell>
                      <TableCell>{device.visited_domain}</TableCell>
                      <TableCell className="font-mono text-sm">{device.visited_ip}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(device.timestamp).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
