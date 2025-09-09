import { Request, Response, NextFunction } from 'express';
import { UserProfile } from '../types';
export declare const getProfile: (req: Request, res: Response<UserProfile>, next: NextFunction) => Promise<void>;
export declare const updateProfile: (req: Request, res: Response<UserProfile>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=profileController.d.ts.map