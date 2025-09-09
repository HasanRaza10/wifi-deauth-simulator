import { Request, Response, NextFunction } from 'express';
import { WiFiListResponse, DeauthRequest, DeauthResponse, ConnectedDevicesResponse } from '../types';
export declare const getWiFiList: (req: Request, res: Response<WiFiListResponse>, next: NextFunction) => Promise<void>;
export declare const simulateDeauth: (req: Request<{}, DeauthResponse, DeauthRequest>, res: Response<DeauthResponse>, next: NextFunction) => Promise<void>;
export declare const getConnectedDevices: (req: Request, res: Response<ConnectedDevicesResponse>, next: NextFunction) => Promise<void>;
export declare const getLiveActivity: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=simulationController.d.ts.map