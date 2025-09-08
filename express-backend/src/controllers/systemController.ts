import { Request, Response, NextFunction } from 'express';
import { DeviceInfo } from '../types';

export const getDeviceInfo = async (
  req: Request,
  res: Response<DeviceInfo>,
  next: NextFunction
): Promise<void> => {
  try {
    // Mock device information
    const deviceInfo: DeviceInfo = {
      mac_address: "00:1B:44:11:3A:B7",
      ip_address: "192.168.1.100",
      gateway: "192.168.1.1",
    };

    res.json(deviceInfo);
  } catch (error) {
    next(error);
  }
};
